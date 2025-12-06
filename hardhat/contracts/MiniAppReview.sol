// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MiniAppReview
 * @dev A smart contract for rating and reviewing Farcaster mini-apps
 * Similar to RateMyProfessor but for Farcaster apps
 */
contract MiniAppReview {
    
    // App structure
    struct App {
        uint256 id;
        string name;
        string description;
        string category;
        string appUrl;
        address from;
        uint256 registeredAt;
        bool isActive;
        uint256 totalRating;        // Sum of all ratings (1-5)
        uint256 reviewCount;        // Number of reviews
    }
    
    // Review structure (like RateMyProfessor reviews)
    struct Review {
        address reviewer;
        uint256 rating;             // 1-5 stars
        string comment;             // Written review
        uint256 difficulty;         // 1-5 (how easy to use)
        uint256 quality;            // 1-5 (quality rating)
        bool wouldRecommend;        // Would you recommend this app?
        uint256 timestamp;
        uint256 helpfulCount;       // How many found this helpful
    }
    
    // Contract owner
    address public owner;
    
    // Storage
    mapping(uint256 => App) public apps;
    mapping(uint256 => Review[]) public appReviews;
    mapping(uint256 => mapping(address => bool)) public hasReviewed;
    mapping(uint256 => mapping(address => uint256)) public reviewIndex;
    mapping(uint256 => mapping(address => mapping(address => bool))) public hasMarkedHelpful;
    
    mapping(address => uint256[]) public posterPost;
    uint256[] public allAppIds;
    string[] public categories;
    
    uint256 public totalApps;
    
    // Events
    event AppRegistered(uint256 indexed appId, string name, address indexed developer);
    event AppUpdated(uint256 indexed appId);
    event ReviewSubmitted(uint256 indexed appId, address indexed reviewer, uint256 rating);
    event ReviewUpdated(uint256 indexed appId, address indexed reviewer);
    event ReviewMarkedHelpful(uint256 indexed appId, uint256 reviewIndex, address marker);
    event AppStatusChanged(uint256 indexed appId, bool isActive);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    modifier appExists(uint256 _appId) {
        require(_appId > 0 && _appId <= totalApps, "App does not exist");
        _;
    }
    
    modifier validRating(uint256 _rating) {
        require(_rating >= 1 && _rating <= 5, "Rating must be 1-5");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        categories = ["Social", "DeFi", "NFT", "Gaming", "Tools", "Media", "Other"];
    }
    
    /**
     * @dev Register a new app
     */
    function registerApp(
        string memory _name,
        string memory _description,
        string memory _category,
        string memory _appUrl
    ) external returns (uint256) {
        require(bytes(_name).length > 0, "Name required");
        require(bytes(_appUrl).length > 0, "URL required");
        
        totalApps++;
        
        apps[totalApps] = App({
            id: totalApps,
            name: _name,
            description: _description,
            category: _category,
            appUrl: _appUrl,
            from: msg.sender,
            registeredAt: block.timestamp,
            isActive: true,
            totalRating: 0,
            reviewCount: 0
        });
        
        posterPost[msg.sender].push(totalApps);
        allAppIds.push(totalApps);
        
        emit AppRegistered(totalApps, _name, msg.sender);
        
        return totalApps;
    }
    
    /**
     * @dev Submit or update a review (like RateMyProfessor)
     */
    function submitReview(
        uint256 _appId,
        uint256 _rating,
        string memory _comment,
        uint256 _difficulty,
        uint256 _quality,
        bool _wouldRecommend
    ) external appExists(_appId) validRating(_rating) validRating(_difficulty) validRating(_quality) {
        App storage app = apps[_appId];
        require(app.isActive, "App not active");
        
        if (hasReviewed[_appId][msg.sender]) {
            // Update existing review
            uint256 idx = reviewIndex[_appId][msg.sender];
            Review storage review = appReviews[_appId][idx];
            
            // Adjust total rating
            app.totalRating = app.totalRating - review.rating + _rating;
            
            review.rating = _rating;
            review.comment = _comment;
            review.difficulty = _difficulty;
            review.quality = _quality;
            review.wouldRecommend = _wouldRecommend;
            review.timestamp = block.timestamp;
            
            emit ReviewUpdated(_appId, msg.sender);
        } else {
            // New review
            appReviews[_appId].push(Review({
                reviewer: msg.sender,
                rating: _rating,
                comment: _comment,
                difficulty: _difficulty,
                quality: _quality,
                wouldRecommend: _wouldRecommend,
                timestamp: block.timestamp,
                helpfulCount: 0
            }));
            
            reviewIndex[_appId][msg.sender] = appReviews[_appId].length - 1;
            hasReviewed[_appId][msg.sender] = true;
            
            app.totalRating += _rating;
            app.reviewCount++;
            
            emit ReviewSubmitted(_appId, msg.sender, _rating);
        }
    }
    
    /**
     * @dev Mark a review as helpful
     */
    function markReviewHelpful(uint256 _appId, uint256 _reviewIndex) external appExists(_appId) {
        require(_reviewIndex < appReviews[_appId].length, "Invalid review index");
        require(!hasMarkedHelpful[_appId][msg.sender][appReviews[_appId][_reviewIndex].reviewer], 
                "Already marked helpful");
        
        appReviews[_appId][_reviewIndex].helpfulCount++;
        hasMarkedHelpful[_appId][msg.sender][appReviews[_appId][_reviewIndex].reviewer] = true;
        
        emit ReviewMarkedHelpful(_appId, _reviewIndex, msg.sender);
    }
    
    /**
     * @dev Update app details (developer only)
     */
    function updateApp(
        uint256 _appId,
        string memory _name,
        string memory _description,
        string memory _category,
        string memory _appUrl
    ) external appExists(_appId) {
        App storage app = apps[_appId];
        require(msg.sender == app.from, "Only Poster can update");
        
        app.name = _name;
        app.description = _description;
        app.category = _category;
        app.appUrl = _appUrl;
        
        emit AppUpdated(_appId);
    }
    
    /**
     * @dev Set app active status
     */
    function setAppStatus(uint256 _appId, bool _isActive) external appExists(_appId) {
        App storage app = apps[_appId];
        require(msg.sender == owner || msg.sender == app.from, "Unauthorized");
        
        app.isActive = _isActive;
        emit AppStatusChanged(_appId, _isActive);
    }
    
    // View functions
    
    /**
     * @dev Get average rating for an app
     * @return Average rating (scaled by 100 for decimals)
     */
    function getAverageRating(uint256 _appId) external view appExists(_appId) returns (uint256) {
        App memory app = apps[_appId];
        if (app.reviewCount == 0) return 0;
        return (app.totalRating * 100) / app.reviewCount;
    }
    
    /**
     * @dev Get all reviews for an app
     */
    function getAppReviews(uint256 _appId) external view appExists(_appId) returns (Review[] memory) {
        return appReviews[_appId];
    }
    
    /**
     * @dev Get app details with rating stats
     */
    function getAppWithStats(uint256 _appId) external view appExists(_appId) returns (
        App memory app,
        uint256 averageRating,
        uint256 recommendPercent
    ) {
        app = apps[_appId];
        
        if (app.reviewCount > 0) {
            averageRating = (app.totalRating * 100) / app.reviewCount;
            
            // Calculate recommendation percentage
            uint256 recommendCount = 0;
            for (uint256 i = 0; i < appReviews[_appId].length; i++) {
                if (appReviews[_appId][i].wouldRecommend) {
                    recommendCount++;
                }
            }
            recommendPercent = (recommendCount * 100) / app.reviewCount;
        }
    }
    
    /**
     * @dev Get top rated apps
     */
    function getTopRatedApps(uint256 _limit) external view returns (uint256[] memory) {
        uint256 limit = _limit > totalApps ? totalApps : _limit;
        
        uint256[] memory topApps = new uint256[](limit);
        uint256[] memory ratings = new uint256[](limit);
        
        for (uint256 i = 1; i <= totalApps; i++) {
            if (!apps[i].isActive || apps[i].reviewCount == 0) continue;
            
            uint256 avgRating = (apps[i].totalRating * 100) / apps[i].reviewCount;
            
            // Insert in sorted position
            for (uint256 j = 0; j < limit; j++) {
                if (avgRating > ratings[j]) {
                    // Shift everything down
                    for (uint256 k = limit - 1; k > j; k--) {
                        topApps[k] = topApps[k-1];
                        ratings[k] = ratings[k-1];
                    }
                    topApps[j] = i;
                    ratings[j] = avgRating;
                    break;
                }
            }
        }
        
        return topApps;
    }
    
    function getAllApps() external view returns (uint256[] memory) {
        return allAppIds;
    }
    
    function getAppsByCategory(string memory _category) external view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < allAppIds.length; i++) {
            if (keccak256(bytes(apps[allAppIds[i]].category)) == keccak256(bytes(_category))) {
                count++;
            }
        }
        
        uint256[] memory result = new uint256[](count);
        uint256 idx = 0;
        for (uint256 i = 0; i < allAppIds.length; i++) {
            if (keccak256(bytes(apps[allAppIds[i]].category)) == keccak256(bytes(_category))) {
                result[idx++] = allAppIds[i];
            }
        }
        
        return result;
    }
    
    function getPosterPost(address _developer) external view returns (uint256[] memory) {
        return posterPost[_developer];
    }
    
    function addCategory(string memory _category) external onlyOwner {
        categories.push(_category);
    }
    
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }
}
