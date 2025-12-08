import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Select, Button, Card, message, Alert } from 'antd';
import { Plus, Info, CheckCircle, ArrowLeft } from 'lucide-react';
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import MiniAppReview from '../artifacts/contracts/MiniAppReview.sol/MiniAppReview.json';

const { TextArea } = Input;
const { Option } = Select;

const categories = [
  "Social",
  "DeFi", 
  "NFT",
  "Gaming",
  "Tools",
  "Media",
  "Communication",
  "Entertainment",
  "News",
  "Governance",
  "Shopping",
  "Developer Tools",
  "Other"
];

const RegisterMiniApp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    appUrl: '',
    developerInfo: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [registeredApp, setRegisteredApp] = useState<any>(null);

  const {
    writeContract,
    data: txHash,
    error
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (formData.name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }
    
    if (!formData.description || formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.appUrl) {
      newErrors.appUrl = 'Please enter the app URL';
    } else {
      try {
        new URL(formData.appUrl);
      } catch {
        newErrors.appUrl = 'Please enter a valid URL (e.g., https://example.com)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const {name, description, category, appUrl} = formData;

      writeContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: MiniAppReview.abi,
        functionName: "registerApp",
        args: [name, description, category, appUrl]
      })
      
      setRegisteredApp({
        id: Math.floor(Math.random() * 10000),
        ...formData,
        registeredAt: new Date().toISOString(),
        developer: '0x1234...5678'
      });
    } catch (error) {
      message.error('Failed to register app. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      appUrl: '',
      developerInfo: ''
    });
    setErrors({});
    setRegisteredApp(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  if (isConfirming) {
    message.loading('Confirming transaction...', 0);
  }

  if (isSuccess) {
    message.destroy();
    message.success('Mini app registered successfully!');
  }

  if (error) {
    message.destroy();
    message.error(`Error: ${error.message}`);
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="shadow-lg">
            <div className="text-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Successfully Registered!
              </h2>
              <p className="text-gray-600">
                Your mini app has been registered on the blockchain
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <span className="text-sm font-semibold text-gray-700">App Name:</span>
                  <p className="text-gray-900">{registeredApp.name}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">Category:</span>
                  <p className="text-gray-900">{registeredApp.category}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">App URL:</span>
                  <p className="text-blue-600 break-all">{registeredApp.appUrl}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">Transaction ID:</span>
                  <p className="text-gray-900 font-mono text-sm">
                    0x{Math.random().toString(16).substr(2, 40)}
                  </p>
                </div>
              </div>
            </div>

            <Alert
              message="What's next?"
              description="Your app is now live in the gallery! Users can start discovering and rating it. You can update your app details anytime."
              type="info"
              showIcon
              className="mb-4"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate("/")}
                type="primary"
                size="large"
                className="flex-1"
              >
                View in Gallery
              </Button>
              <Button
                size="large"
                className="flex-1"
                onClick={handleReset}
              >
                Register Another App
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={() => navigate("/")}
            icon={<ArrowLeft size={16} />}
            type="text"
            className="mb-4"
          >
            Back to Gallery
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Register a Mini App
          </h1>
          <p className="text-gray-600">
            Add any Farcaster mini app to the gallery. You don't need to be the owner.
          </p>
        </div>

        {/* Info Alert */}
        <Alert
          message="Anyone can register"
          description="You can register any Farcaster mini app, even if you're not the developer. Help grow the ecosystem by adding apps you discover!"
          type="info"
          icon={<Info size={16} />}
          showIcon
          className="mb-6"
        />

        {/* Registration Form */}
        <Card className="shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                App Name <span className="text-red-500">*</span>
              </label>
              <Input
                size="large"
                placeholder="e.g., FarQuest, CastVault"
                maxLength={50}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                status={errors.name ? 'error' : ''}
              />
              {errors.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <TextArea
                size="large"
                placeholder="Describe what the app does and its key features..."
                rows={4}
                maxLength={500}
                showCount
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                status={errors.description ? 'error' : ''}
              />
              {errors.description && (
                <div className="text-red-500 text-sm mt-1">{errors.description}</div>
              )}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <Select
                size="large"
                placeholder="Select a category"
                showSearch
                className="w-full"
                value={formData.category || undefined}
                onChange={(value) => handleInputChange('category', value)}
                status={errors.category ? 'error' : ''}
              >
                {categories.map(category => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
              {errors.category && (
                <div className="text-red-500 text-sm mt-1">{errors.category}</div>
              )}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                App URL <span className="text-red-500">*</span>
              </label>
              <Input
                size="large"
                placeholder="https://example.com"
                type="url"
                value={formData.appUrl}
                onChange={(e) => handleInputChange('appUrl', e.target.value)}
                status={errors.appUrl ? 'error' : ''}
              />
              <div className="text-gray-500 text-sm mt-1">
                The full URL where users can access the app
              </div>
              {errors.appUrl && (
                <div className="text-red-500 text-sm mt-1">{errors.appUrl}</div>
              )}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Developer/Contact Info (Optional)
              </label>
              <Input
                size="large"
                placeholder="@username or https://..."
                value={formData.developerInfo}
                onChange={(e) => handleInputChange('developerInfo', e.target.value)}
              />
              <div className="text-gray-500 text-sm mt-1">
                Farcaster username, Twitter handle, or website
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Info size={16} />
                Registration Details
              </h4>
              <ul className="text-sm text-blue-800 space-y-1 ml-6 list-disc">
                <li>Registration is free and stored on-chain</li>
                <li>The app will appear in the gallery immediately</li>
                <li>Anyone can rate and review the app</li>
                <li>Developers can claim ownership later to update details</li>
              </ul>
            </div>

            <Button
              type="primary"
              size="large"
              loading={loading}
              icon={<Plus size={18} />}
              block
              className="h-12 text-base font-semibold"
              onClick={handleSubmit}
            >
              {loading ? 'Registering...' : 'Register Mini App'}
            </Button>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="mt-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Do I need to own the app to register it?
              </h4>
              <p className="text-sm text-gray-600">
                No! Anyone can register any Farcaster mini app. This helps the community discover new apps.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                What if the app is already registered?
              </h4>
              <p className="text-sm text-gray-600">
                The transaction will fail if the app URL is already registered. You can search the gallery first to check.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Can I update the app details later?
              </h4>
              <p className="text-sm text-gray-600">
                Developers can claim ownership of their apps and update details. If you're not the developer, contact them to make changes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Is there a cost to register?
              </h4>
              <p className="text-sm text-gray-600">
                Only blockchain gas fees apply. The registration itself is free.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterMiniApp;
