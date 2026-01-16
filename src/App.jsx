import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, addDays, differenceInDays } from 'date-fns';
import {
  Building2, Users, AlertTriangle, TrendingUp, Calendar, CheckCircle2, Clock, XCircle,
  MessageSquare, Send, Bot, ChevronRight, ChevronLeft, Plus, Filter, Search,
  FileText, Settings, BarChart3, Activity, Shield, Zap, Target, Flag,
  AlertCircle, ArrowRight, Sparkles, Brain, RefreshCw, Upload, Check, X,
  Menu, Home, Layers, PlayCircle, PauseCircle, MoreVertical, Edit2, Trash2,
  MapPin, Phone, Mail, ExternalLink, Download, Eye, Star, Bell, Info
} from 'lucide-react';
import {
  isAIEnabled, getAIStatusMessage, predictImplementationDelay,
  generateTaskDescriptions, getAssistantResponse, analyzeEscalation, analyzeComplianceDocument
} from './aiHelpers';

// ============================================================================
// DESIGN SYSTEM - Colors & Styles
// ============================================================================
const colors = {
  primary: '#3b82f6',
  primaryDark: '#2563eb',
  primaryLight: '#60a5fa',
  success: '#10b981',
  successLight: '#34d399',
  warning: '#f59e0b',
  warningLight: '#fbbf24',
  danger: '#ef4444',
  dangerLight: '#f87171',
  neutral900: '#0f172a',
  neutral700: '#334155',
  neutral600: '#475569',
  neutral500: '#64748b',
  neutral400: '#94a3b8',
  neutral300: '#cbd5e1',
  neutral200: '#e2e8f0',
  neutral100: '#f1f5f9',
  neutral50: '#f8fafc',
  white: '#ffffff'
};

const baseStyles = {
  container: {
    minHeight: '100vh',
    backgroundColor: colors.neutral100,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '24px'
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease'
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: `1px solid ${colors.neutral300}`,
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  }
};

// ============================================================================
// MOCK DATA
// ============================================================================
const mockCampaigns = [
  {
    id: 'camp-1',
    name: 'EHR Modernization 2024',
    playbook: 'ehr-implementation',
    startDate: '2024-01-15',
    endDate: '2024-04-30',
    status: 'active',
    description: 'Enterprise-wide EHR system upgrade across all practice locations'
  },
  {
    id: 'camp-2',
    name: 'Provider Credentialing Q1',
    playbook: 'credentialing',
    startDate: '2024-02-01',
    endDate: '2024-05-15',
    status: 'active',
    description: 'Credentialing rollout for new provider network expansion'
  }
];

const mockPractices = [
  { id: 'prac-1', name: 'Valley Medical Center', location: 'Los Angeles, CA', state: 'CA', cohort: 'Cohort A', campaignId: 'camp-1', progress: 72, phone: '(310) 555-0101', email: 'admin@valleymed.com' },
  { id: 'prac-2', name: 'Sunrise Health Partners', location: 'San Diego, CA', state: 'CA', cohort: 'Cohort A', campaignId: 'camp-1', progress: 65, phone: '(619) 555-0102', email: 'ops@sunrisehealth.com' },
  { id: 'prac-3', name: 'Metro Primary Care', location: 'Houston, TX', state: 'TX', cohort: 'Cohort B', campaignId: 'camp-1', progress: 45, phone: '(713) 555-0103', email: 'info@metroprimary.com' },
  { id: 'prac-4', name: 'Gulf Coast Medical', location: 'Austin, TX', state: 'TX', cohort: 'Cohort B', campaignId: 'camp-1', progress: 38, phone: '(512) 555-0104', email: 'contact@gulfcoastmed.com' },
  { id: 'prac-5', name: 'Empire State Clinic', location: 'New York, NY', state: 'NY', cohort: 'Cohort C', campaignId: 'camp-1', progress: 28, phone: '(212) 555-0105', email: 'admin@empireclinic.com' },
  { id: 'prac-6', name: 'Brooklyn Family Health', location: 'Brooklyn, NY', state: 'NY', cohort: 'Cohort C', campaignId: 'camp-1', progress: 22, phone: '(718) 555-0106', email: 'info@brooklynfh.com' },
  { id: 'prac-7', name: 'Pacific Wellness Group', location: 'San Francisco, CA', state: 'CA', cohort: 'Cohort A', campaignId: 'camp-2', progress: 88, phone: '(415) 555-0107', email: 'ops@pacificwellness.com' },
  { id: 'prac-8', name: 'Lone Star Medical', location: 'Dallas, TX', state: 'TX', cohort: 'Cohort B', campaignId: 'camp-2', progress: 55, phone: '(214) 555-0108', email: 'admin@lonestarmed.com' },
  { id: 'prac-9', name: 'Hudson Valley Care', location: 'Albany, NY', state: 'NY', cohort: 'Cohort C', campaignId: 'camp-2', progress: 12, phone: '(518) 555-0109', email: 'contact@hudsoncare.com' }
];

const mockTasks = [
  { id: 't-1', practiceId: 'prac-1', title: 'Complete vendor assessment questionnaire', category: 'Vendor', status: 'completed', dueDate: '2024-02-01', assignedRole: 'Practice Manager', criticalPath: true, completedDate: '2024-01-28' },
  { id: 't-2', practiceId: 'prac-1', title: 'Sign data migration agreement', category: 'Legal', status: 'completed', dueDate: '2024-02-05', assignedRole: 'Practice Manager', criticalPath: true, completedDate: '2024-02-03' },
  { id: 't-3', practiceId: 'prac-1', title: 'Complete HIPAA security assessment', category: 'Compliance', status: 'in_progress', dueDate: '2024-02-20', assignedRole: 'Compliance Officer', criticalPath: true },
  { id: 't-4', practiceId: 'prac-1', title: 'Configure user roles and permissions', category: 'Technical', status: 'blocked', dueDate: '2024-02-15', assignedRole: 'IT Lead', criticalPath: false, blockerReason: 'Waiting for vendor to provide admin credentials' },
  { id: 't-5', practiceId: 'prac-1', title: 'Conduct staff EHR training - Module 1', category: 'Training', status: 'pending', dueDate: '2024-03-01', assignedRole: 'Clinical Lead', criticalPath: false },
  { id: 't-6', practiceId: 'prac-1', title: 'Validate data migration accuracy', category: 'Quality', status: 'pending', dueDate: '2024-03-10', assignedRole: 'Practice Manager', criticalPath: true },
  { id: 't-7', practiceId: 'prac-1', title: 'Submit CA state compliance attestation', category: 'Compliance', status: 'pending', dueDate: '2024-03-15', assignedRole: 'Compliance Officer', criticalPath: true, stateSpecific: 'CA' },
  { id: 't-8', practiceId: 'prac-1', title: 'Complete go-live readiness assessment', category: 'Quality', status: 'pending', dueDate: '2024-03-20', assignedRole: 'Practice Manager', criticalPath: true },
  { id: 't-9', practiceId: 'prac-3', title: 'Complete vendor assessment questionnaire', category: 'Vendor', status: 'completed', dueDate: '2024-02-10', assignedRole: 'Practice Manager', criticalPath: true, completedDate: '2024-02-08' },
  { id: 't-10', practiceId: 'prac-3', title: 'Sign data migration agreement', category: 'Legal', status: 'blocked', dueDate: '2024-02-15', assignedRole: 'Practice Manager', criticalPath: true, blockerReason: 'Legal team reviewing contract terms - awaiting approval' },
  { id: 't-11', practiceId: 'prac-3', title: 'Submit TX state licensing verification', category: 'Compliance', status: 'blocked', dueDate: '2024-02-18', assignedRole: 'Compliance Officer', criticalPath: true, blockerReason: 'State board has 3-week processing backlog', stateSpecific: 'TX' },
  { id: 't-12', practiceId: 'prac-3', title: 'Complete HIPAA security assessment', category: 'Compliance', status: 'in_progress', dueDate: '2024-02-25', assignedRole: 'Compliance Officer', criticalPath: true },
  { id: 't-13', practiceId: 'prac-5', title: 'Complete vendor assessment questionnaire', category: 'Vendor', status: 'completed', dueDate: '2024-02-20', assignedRole: 'Practice Manager', criticalPath: true, completedDate: '2024-02-19' },
  { id: 't-14', practiceId: 'prac-5', title: 'Submit NY SHIELD Act compliance documentation', category: 'Compliance', status: 'blocked', dueDate: '2024-02-25', assignedRole: 'Compliance Officer', criticalPath: true, blockerReason: 'Awaiting updated privacy policy from corporate legal', stateSpecific: 'NY' },
  { id: 't-15', practiceId: 'prac-5', title: 'Sign data migration agreement', category: 'Legal', status: 'pending', dueDate: '2024-03-01', assignedRole: 'Practice Manager', criticalPath: true },
  { id: 't-16', practiceId: 'prac-5', title: 'Complete Article 28 facility requirements', category: 'Compliance', status: 'pending', dueDate: '2024-03-05', assignedRole: 'Compliance Officer', criticalPath: false, stateSpecific: 'NY' }
];

const mockAnnouncements = [
  {
    id: 'ann-1',
    campaignId: 'camp-1',
    title: 'Vendor Training Webinar Scheduled',
    content: 'The EHR vendor has scheduled a comprehensive training webinar for all practice managers on February 28th at 2 PM EST. This session will cover the new patient portal features and data migration best practices. Attendance is mandatory for all Cohort A and B practices.',
    author: 'Sarah Chen',
    authorRole: 'Implementation Director',
    createdAt: '2024-02-15T10:30:00Z',
    priority: 'high',
    comments: [
      { id: 'c-1', author: 'Mike Rodriguez', content: 'Will the recording be available for those who cannot attend live?', createdAt: '2024-02-15T11:45:00Z' },
      { id: 'c-2', author: 'Sarah Chen', content: 'Yes, recordings will be shared within 24 hours of the session.', createdAt: '2024-02-15T12:00:00Z' }
    ]
  },
  {
    id: 'ann-2',
    campaignId: 'camp-1',
    title: 'Updated Data Migration Timeline',
    content: 'Based on feedback from the pilot practices, we are adjusting the data migration timeline to allow for additional validation steps. Cohort B practices will now begin migration on March 15th instead of March 1st. This change ensures higher data quality and reduces risk of go-live issues.',
    author: 'James Wilson',
    authorRole: 'Project Manager',
    createdAt: '2024-02-12T14:00:00Z',
    priority: 'medium',
    comments: [
      { id: 'c-3', author: 'Dr. Patricia Lee', content: 'Thank you for the additional time. Our team will use this to complete the preliminary data cleanup.', createdAt: '2024-02-12T15:30:00Z' }
    ]
  },
  {
    id: 'ann-3',
    campaignId: 'camp-1',
    title: 'Compliance Documentation Reminder',
    content: 'All practices must submit their state-specific compliance documentation by the end of this month. California practices need CMIA attestations, Texas practices need TMB verification forms, and New York practices need SHIELD Act compliance certificates. Contact the compliance team if you need assistance.',
    author: 'Amanda Foster',
    authorRole: 'Compliance Director',
    createdAt: '2024-02-10T09:00:00Z',
    priority: 'high',
    comments: []
  }
];

const mockPlaybooks = [
  { id: 'pb-1', name: 'EHR Implementation', description: 'Complete electronic health record system deployment', taskCount: 28, estimatedDays: 65, category: 'Technology' },
  { id: 'pb-2', name: 'Provider Credentialing', description: 'New provider onboarding and payer enrollment', taskCount: 27, estimatedDays: 85, category: 'Compliance' },
  { id: 'pb-3', name: 'Telemedicine Platform', description: 'Virtual care capability deployment', taskCount: 23, estimatedDays: 35, category: 'Technology' },
  { id: 'pb-4', name: 'Revenue Cycle Optimization', description: 'Billing and collections process improvement', taskCount: 23, estimatedDays: 70, category: 'Operations' },
  { id: 'pb-5', name: 'Custom Implementation', description: 'Build a custom implementation playbook', taskCount: 19, estimatedDays: 50, category: 'Custom' }
];

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendUp, color = colors.primary }) => (
  <div style={{ ...baseStyles.card, display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      backgroundColor: `${color}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Icon size={24} color={color} />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: '13px', color: colors.neutral500, marginBottom: '4px' }}>{title}</p>
      <p style={{ fontSize: '28px', fontWeight: '700', color: colors.neutral900, marginBottom: '4px' }}>{value}</p>
      {subtitle && <p style={{ fontSize: '12px', color: colors.neutral500 }}>{subtitle}</p>}
      {trend && (
        <p style={{ fontSize: '12px', color: trendUp ? colors.success : colors.danger, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
          <TrendingUp size={14} style={{ transform: trendUp ? 'none' : 'rotate(180deg)' }} />
          {trend}
        </p>
      )}
    </div>
  </div>
);

const ProgressBar = ({ value, height = 8, color = colors.primary, showLabel = false, size = 'default' }) => (
  <div style={{ width: '100%' }}>
    {showLabel && (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', color: colors.neutral500 }}>Progress</span>
        <span style={{ fontSize: '12px', fontWeight: '600', color: colors.neutral700 }}>{value}%</span>
      </div>
    )}
    <div style={{
      width: '100%',
      height: `${height}px`,
      backgroundColor: colors.neutral200,
      borderRadius: `${height / 2}px`,
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${value}%`,
        height: '100%',
        backgroundColor: value >= 70 ? colors.success : value >= 40 ? colors.warning : colors.danger,
        borderRadius: `${height / 2}px`,
        transition: 'width 0.5s ease'
      }} />
    </div>
  </div>
);

const StatusBadge = ({ status, size = 'default' }) => {
  const configs = {
    completed: { bg: `${colors.success}15`, color: colors.success, label: 'Completed', icon: CheckCircle2 },
    in_progress: { bg: `${colors.primary}15`, color: colors.primary, label: 'In Progress', icon: Clock },
    pending: { bg: `${colors.neutral200}`, color: colors.neutral600, label: 'Pending', icon: Clock },
    blocked: { bg: `${colors.danger}15`, color: colors.danger, label: 'Blocked', icon: XCircle },
    active: { bg: `${colors.success}15`, color: colors.success, label: 'Active', icon: Activity },
    at_risk: { bg: `${colors.warning}15`, color: colors.warning, label: 'At Risk', icon: AlertTriangle },
    critical: { bg: `${colors.danger}15`, color: colors.danger, label: 'Critical', icon: AlertCircle }
  };
  const config = configs[status] || configs.pending;
  const Icon = config.icon;
  const padding = size === 'small' ? '4px 8px' : '6px 12px';
  const fontSize = size === 'small' ? '11px' : '12px';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding,
      borderRadius: '6px',
      backgroundColor: config.bg,
      color: config.color,
      fontSize,
      fontWeight: '500'
    }}>
      <Icon size={size === 'small' ? 12 : 14} />
      {config.label}
    </span>
  );
};

const AIBadge = () => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    color: colors.white,
    fontSize: '12px',
    fontWeight: '500'
  }}>
    <Sparkles size={14} />
    {getAIStatusMessage()}
  </div>
);

// ============================================================================
// AI COMPONENTS
// ============================================================================

const AIDelayPrediction = ({ prediction, compact = false }) => {
  if (!prediction || prediction.riskLevel === 'low') return null;

  const riskColors = {
    critical: colors.danger,
    high: colors.warning,
    medium: colors.warningLight
  };

  const riskColor = riskColors[prediction.riskLevel] || colors.neutral500;

  if (compact) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        borderRadius: '6px',
        backgroundColor: `${riskColor}15`,
        fontSize: '11px',
        color: riskColor,
        fontWeight: '500'
      }}>
        <Brain size={12} />
        AI: {prediction.riskLevel.charAt(0).toUpperCase() + prediction.riskLevel.slice(1)} Risk
      </div>
    );
  }

  return (
    <div style={{
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: `${riskColor}10`,
      border: `1px solid ${riskColor}30`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Brain size={18} color={riskColor} />
        <span style={{ fontWeight: '600', color: riskColor }}>
          AI Delay Prediction: {prediction.riskLevel.charAt(0).toUpperCase() + prediction.riskLevel.slice(1)} Risk
        </span>
      </div>
      <p style={{ fontSize: '14px', color: colors.neutral700, marginBottom: '12px' }}>
        {prediction.prediction}
      </p>
      {prediction.riskFactors?.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <p style={{ fontSize: '12px', fontWeight: '600', color: colors.neutral600, marginBottom: '6px' }}>Risk Factors:</p>
          {prediction.riskFactors.map((factor, i) => (
            <p key={i} style={{ fontSize: '12px', color: colors.neutral600, paddingLeft: '12px', marginBottom: '4px' }}>
              • {factor}
            </p>
          ))}
        </div>
      )}
      {prediction.recommendations?.length > 0 && (
        <div>
          <p style={{ fontSize: '12px', fontWeight: '600', color: colors.neutral600, marginBottom: '6px' }}>Recommendations:</p>
          {prediction.recommendations.map((rec, i) => (
            <p key={i} style={{ fontSize: '12px', color: colors.neutral600, paddingLeft: '12px', marginBottom: '4px' }}>
              • {rec}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const AIAssistant = ({ practiceContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your OnboardHealth AI assistant. I can help you with implementation questions, task guidance, compliance requirements, and more. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getAssistantResponse(userMessage, practiceContext);
      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
          zIndex: 1000,
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Bot size={28} color={colors.white} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          width: '380px',
          height: '500px',
          backgroundColor: colors.white,
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={24} color={colors.white} />
              <div>
                <p style={{ color: colors.white, fontWeight: '600', fontSize: '15px' }}>AI Assistant</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px' }}>Powered by OnboardHealth AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              <X size={20} color={colors.white} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                <div style={{
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  backgroundColor: msg.role === 'user' ? colors.primary : colors.neutral100,
                  color: msg.role === 'user' ? colors.white : colors.neutral700,
                  fontSize: '13px',
                  lineHeight: '1.5'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '14px 14px 14px 4px',
                  backgroundColor: colors.neutral100,
                  display: 'flex',
                  gap: '4px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colors.neutral400, animation: 'pulse 1.4s infinite' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colors.neutral400, animation: 'pulse 1.4s infinite 0.2s' }} />
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colors.neutral400, animation: 'pulse 1.4s infinite 0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: `1px solid ${colors.neutral200}`,
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              style={{
                ...baseStyles.input,
                flex: 1
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{
                ...baseStyles.button,
                backgroundColor: colors.primary,
                color: colors.white,
                padding: '10px 14px',
                opacity: isLoading || !input.trim() ? 0.5 : 1
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </>
  );
};

// ============================================================================
// NAVIGATION
// ============================================================================

const Navigation = ({ currentView }) => {
  const navigate = useNavigate();

  return (
    <header style={{
      backgroundColor: colors.white,
      borderBottom: `1px solid ${colors.neutral200}`,
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Activity size={22} color={colors.white} />
            </div>
            <div>
              <p style={{ fontSize: '18px', fontWeight: '700', color: colors.neutral900 }}>OnboardHealth</p>
              <p style={{ fontSize: '11px', color: colors.neutral500 }}>MSO Implementation Platform</p>
            </div>
          </Link>

          <nav style={{ display: 'flex', gap: '8px' }}>
            <Link
              to="/dashboard"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'none',
                color: currentView === 'dashboard' ? colors.primary : colors.neutral600,
                backgroundColor: currentView === 'dashboard' ? `${colors.primary}10` : 'transparent'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={16} />
                Dashboard
              </span>
            </Link>
            <Link
              to="/campaign/new"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'none',
                color: currentView === 'wizard' ? colors.primary : colors.neutral600,
                backgroundColor: currentView === 'wizard' ? `${colors.primary}10` : 'transparent'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} />
                New Campaign
              </span>
            </Link>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <AIBadge />
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: colors.neutral100,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bell size={20} color={colors.neutral600} />
          </button>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.white,
            fontWeight: '600',
            fontSize: '14px'
          }}>
            SC
          </div>
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// CORPORATE DASHBOARD
// ============================================================================

const CorporateDashboard = () => {
  const navigate = useNavigate();
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0]);
  const [predictions, setPredictions] = useState({});
  const [loadingPredictions, setLoadingPredictions] = useState(true);

  const campaignPractices = mockPractices.filter(p => p.campaignId === selectedCampaign.id);
  const campaignTasks = mockTasks.filter(t => campaignPractices.some(p => p.id === t.practiceId));

  // Calculate metrics
  const avgProgress = Math.round(campaignPractices.reduce((sum, p) => sum + p.progress, 0) / campaignPractices.length);
  const blockedTaskCount = campaignTasks.filter(t => t.status === 'blocked').length;
  const atRiskPractices = campaignPractices.filter(p => p.progress < 50 || predictions[p.id]?.riskLevel === 'high' || predictions[p.id]?.riskLevel === 'critical');

  // Load AI predictions
  useEffect(() => {
    const loadPredictions = async () => {
      setLoadingPredictions(true);
      const newPredictions = {};

      for (const practice of campaignPractices) {
        const practiceTasks = mockTasks.filter(t => t.practiceId === practice.id);
        const prediction = await predictImplementationDelay(practice, practiceTasks, selectedCampaign);
        newPredictions[practice.id] = prediction;
      }

      setPredictions(newPredictions);
      setLoadingPredictions(false);
    };

    loadPredictions();
  }, [selectedCampaign.id]);

  // Cohort performance data
  const cohortData = ['Cohort A', 'Cohort B', 'Cohort C'].map(cohort => {
    const cohortPractices = campaignPractices.filter(p => p.cohort === cohort);
    return {
      name: cohort,
      progress: cohortPractices.length > 0
        ? Math.round(cohortPractices.reduce((sum, p) => sum + p.progress, 0) / cohortPractices.length)
        : 0,
      practices: cohortPractices.length
    };
  });

  // Timeline data
  const timelineData = [
    { week: 'Week 1', planned: 15, actual: 18 },
    { week: 'Week 2', planned: 30, actual: 28 },
    { week: 'Week 3', planned: 45, actual: 42 },
    { week: 'Week 4', planned: 60, actual: 55 },
    { week: 'Week 5', planned: 75, actual: avgProgress },
    { week: 'Week 6', planned: 90, actual: null }
  ];

  return (
    <div style={baseStyles.container}>
      <Navigation currentView="dashboard" />

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Campaign Selector */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: colors.neutral900, marginBottom: '4px' }}>
              {selectedCampaign.name}
            </h1>
            <p style={{ fontSize: '14px', color: colors.neutral500 }}>{selectedCampaign.description}</p>
          </div>
          <select
            value={selectedCampaign.id}
            onChange={e => setSelectedCampaign(mockCampaigns.find(c => c.id === e.target.value))}
            style={{
              ...baseStyles.input,
              width: 'auto',
              padding: '10px 36px 10px 14px',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center'
            }}
          >
            {mockCampaigns.map(camp => (
              <option key={camp.id} value={camp.id}>{camp.name}</option>
            ))}
          </select>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
          <StatCard
            title="Active Practices"
            value={campaignPractices.length}
            subtitle="In this campaign"
            icon={Building2}
            color={colors.primary}
          />
          <StatCard
            title="Avg. Progress"
            value={`${avgProgress}%`}
            subtitle="Across all practices"
            icon={TrendingUp}
            trend="+5% this week"
            trendUp={true}
            color={colors.success}
          />
          <StatCard
            title="Active Blockers"
            value={blockedTaskCount}
            subtitle="Requiring attention"
            icon={AlertTriangle}
            color={colors.danger}
          />
          <StatCard
            title="At-Risk Practices"
            value={atRiskPractices.length}
            subtitle="AI-identified risks"
            icon={Target}
            color={colors.warning}
          />
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          {/* Cohort Performance */}
          <div style={baseStyles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.neutral900, marginBottom: '20px' }}>
              Cohort Performance
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={cohortData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.neutral200} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: colors.neutral600 }} />
                <YAxis tick={{ fontSize: 12, fill: colors.neutral600 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: colors.white, border: `1px solid ${colors.neutral200}`, borderRadius: '8px' }}
                />
                <Bar dataKey="progress" fill={colors.primary} radius={[4, 4, 0, 0]} name="Progress %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Implementation Timeline */}
          <div style={baseStyles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.neutral900, marginBottom: '20px' }}>
              Implementation Timeline
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.neutral200} />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: colors.neutral600 }} />
                <YAxis tick={{ fontSize: 12, fill: colors.neutral600 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: colors.white, border: `1px solid ${colors.neutral200}`, borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="planned" stroke={colors.neutral400} strokeDasharray="5 5" name="Planned" strokeWidth={2} />
                <Line type="monotone" dataKey="actual" stroke={colors.primary} name="Actual" strokeWidth={2} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Practice Grid & Announcements */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Practice Status Grid */}
          <div style={baseStyles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.neutral900 }}>
                Practice Status
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: colors.neutral500 }}>
                  {loadingPredictions ? 'Analyzing risks...' : 'AI predictions loaded'}
                </span>
                {loadingPredictions && <RefreshCw size={14} color={colors.neutral400} style={{ animation: 'spin 1s linear infinite' }} />}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {campaignPractices.map(practice => {
                const practiceTasks = mockTasks.filter(t => t.practiceId === practice.id);
                const blockers = practiceTasks.filter(t => t.status === 'blocked').length;
                const prediction = predictions[practice.id];
                const isAtRisk = prediction?.riskLevel === 'high' || prediction?.riskLevel === 'critical';

                return (
                  <div
                    key={practice.id}
                    onClick={() => navigate(`/practice/${practice.id}`)}
                    style={{
                      padding: '16px',
                      borderRadius: '10px',
                      border: `1px solid ${isAtRisk ? colors.warning : colors.neutral200}`,
                      backgroundColor: isAtRisk ? `${colors.warning}05` : colors.white,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = colors.primary;
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = isAtRisk ? colors.warning : colors.neutral200;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <h4 style={{ fontSize: '14px', fontWeight: '600', color: colors.neutral900 }}>
                            {practice.name}
                          </h4>
                          {prediction && prediction.riskLevel !== 'low' && (
                            <AIDelayPrediction prediction={prediction} compact={true} />
                          )}
                        </div>
                        <p style={{ fontSize: '12px', color: colors.neutral500 }}>
                          {practice.location} • {practice.cohort}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {blockers > 0 && (
                          <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor: `${colors.danger}15`,
                            color: colors.danger,
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            <AlertCircle size={12} />
                            {blockers} blocker{blockers > 1 ? 's' : ''}
                          </span>
                        )}
                        <ChevronRight size={18} color={colors.neutral400} />
                      </div>
                    </div>
                    <ProgressBar value={practice.progress} height={6} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                      <span style={{ fontSize: '11px', color: colors.neutral500 }}>
                        {practiceTasks.filter(t => t.status === 'completed').length}/{practiceTasks.length} tasks completed
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: colors.neutral700 }}>
                        {practice.progress}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Announcements Feed */}
          <div style={baseStyles.card}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.neutral900, marginBottom: '20px' }}>
              Campaign Announcements
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {mockAnnouncements.filter(a => a.campaignId === selectedCampaign.id).map(announcement => (
                <div
                  key={announcement.id}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    backgroundColor: colors.neutral50,
                    borderLeft: `3px solid ${announcement.priority === 'high' ? colors.danger : colors.primary}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '600', color: colors.neutral900, flex: 1 }}>
                      {announcement.title}
                    </h4>
                    {announcement.priority === 'high' && (
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: `${colors.danger}15`,
                        color: colors.danger,
                        fontSize: '10px',
                        fontWeight: '600'
                      }}>
                        HIGH
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: colors.neutral600, lineHeight: '1.5', marginBottom: '8px' }}>
                    {announcement.content.slice(0, 150)}...
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', color: colors.neutral500 }}>
                      {announcement.author} • {format(new Date(announcement.createdAt), 'MMM d')}
                    </span>
                    {announcement.comments.length > 0 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: colors.neutral500 }}>
                        <MessageSquare size={12} />
                        {announcement.comments.length}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// PRACTICE VIEW
// ============================================================================

const PracticeView = () => {
  const { practiceId } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [prediction, setPrediction] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(true);
  const [escalationData, setEscalationData] = useState({});

  const practice = mockPractices.find(p => p.id === practiceId);
  const campaign = mockCampaigns.find(c => c.id === practice?.campaignId);
  const tasks = mockTasks.filter(t => t.practiceId === practiceId);

  // Calculate stats
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const blockedTasks = tasks.filter(t => t.status === 'blocked').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;

  const daysToDeadline = campaign ? differenceInDays(new Date(campaign.endDate), new Date()) : 0;

  // Load AI prediction
  useEffect(() => {
    const loadPrediction = async () => {
      if (!practice || !campaign) return;
      setLoadingPrediction(true);
      const pred = await predictImplementationDelay(practice, tasks, campaign);
      setPrediction(pred);
      setLoadingPrediction(false);

      // Load escalation data for blocked tasks
      const blockedTasksList = tasks.filter(t => t.status === 'blocked');
      const escalations = {};
      for (const task of blockedTasksList) {
        const escalation = await analyzeEscalation(task, practice, campaign);
        escalations[task.id] = escalation;
      }
      setEscalationData(escalations);
    };

    loadPrediction();
  }, [practiceId]);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'my') return task.assignedRole === 'Practice Manager';
    if (filter === 'upcoming') return task.status === 'pending' || task.status === 'in_progress';
    if (filter === 'blocked') return task.status === 'blocked';
    return true;
  });

  if (!practice) {
    return (
      <div style={baseStyles.container}>
        <Navigation currentView="practice" />
        <div style={{ padding: '48px', textAlign: 'center' }}>
          <p style={{ color: colors.neutral500 }}>Practice not found</p>
          <button onClick={() => navigate('/dashboard')} style={{ ...baseStyles.button, backgroundColor: colors.primary, color: colors.white, marginTop: '16px' }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={baseStyles.container}>
      <Navigation currentView="practice" />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.primary, fontSize: '13px' }}
          >
            Dashboard
          </button>
          <ChevronRight size={14} color={colors.neutral400} />
          <span style={{ fontSize: '13px', color: colors.neutral600 }}>{practice.name}</span>
        </div>

        {/* Practice Header */}
        <div style={{ ...baseStyles.card, marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: colors.neutral900 }}>
                  {practice.name}
                </h1>
                <StatusBadge status={practice.progress >= 70 ? 'active' : practice.progress >= 40 ? 'at_risk' : 'critical'} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: colors.neutral500, fontSize: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} />
                  {practice.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Layers size={14} />
                  {practice.cohort}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} />
                  {daysToDeadline} days to deadline
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '36px', fontWeight: '700', color: colors.primary }}>{practice.progress}%</p>
              <p style={{ fontSize: '12px', color: colors.neutral500 }}>Complete</p>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <ProgressBar value={practice.progress} height={10} showLabel={false} />
          </div>

          {/* AI Prediction Alert */}
          {!loadingPrediction && prediction && prediction.riskLevel !== 'low' && (
            <div style={{ marginTop: '20px' }}>
              <AIDelayPrediction prediction={prediction} />
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ ...baseStyles.card, padding: '16px', textAlign: 'center' }}>
            <CheckCircle2 size={24} color={colors.success} style={{ marginBottom: '8px' }} />
            <p style={{ fontSize: '24px', fontWeight: '700', color: colors.neutral900 }}>{completedTasks}</p>
            <p style={{ fontSize: '12px', color: colors.neutral500 }}>Completed</p>
          </div>
          <div style={{ ...baseStyles.card, padding: '16px', textAlign: 'center' }}>
            <Clock size={24} color={colors.primary} style={{ marginBottom: '8px' }} />
            <p style={{ fontSize: '24px', fontWeight: '700', color: colors.neutral900 }}>{inProgressTasks}</p>
            <p style={{ fontSize: '12px', color: colors.neutral500 }}>In Progress</p>
          </div>
          <div style={{ ...baseStyles.card, padding: '16px', textAlign: 'center' }}>
            <XCircle size={24} color={colors.danger} style={{ marginBottom: '8px' }} />
            <p style={{ fontSize: '24px', fontWeight: '700', color: colors.neutral900 }}>{blockedTasks}</p>
            <p style={{ fontSize: '12px', color: colors.neutral500 }}>Blocked</p>
          </div>
          <div style={{ ...baseStyles.card, padding: '16px', textAlign: 'center' }}>
            <FileText size={24} color={colors.neutral400} style={{ marginBottom: '8px' }} />
            <p style={{ fontSize: '24px', fontWeight: '700', color: colors.neutral900 }}>{tasks.length}</p>
            <p style={{ fontSize: '12px', color: colors.neutral500 }}>Total Tasks</p>
          </div>
        </div>

        {/* Task List */}
        <div style={baseStyles.card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.neutral900 }}>
              Implementation Tasks
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['all', 'my', 'upcoming', 'blocked'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    backgroundColor: filter === f ? colors.primary : colors.neutral100,
                    color: filter === f ? colors.white : colors.neutral600
                  }}
                >
                  {f === 'all' ? 'All' : f === 'my' ? 'My Tasks' : f === 'upcoming' ? 'Upcoming' : 'Blocked'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredTasks.map(task => {
              const escalation = escalationData[task.id];
              const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

              return (
                <div
                  key={task.id}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: `1px solid ${task.status === 'blocked' ? colors.danger : colors.neutral200}`,
                    backgroundColor: task.status === 'blocked' ? `${colors.danger}05` : colors.white
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: colors.neutral900 }}>
                          {task.title}
                        </h4>
                        {task.criticalPath && (
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: `${colors.warning}15`,
                            color: colors.warning,
                            fontSize: '10px',
                            fontWeight: '600'
                          }}>
                            CRITICAL PATH
                          </span>
                        )}
                        {task.stateSpecific && (
                          <span style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: `${colors.primary}15`,
                            color: colors.primary,
                            fontSize: '10px',
                            fontWeight: '600'
                          }}>
                            {task.stateSpecific}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: colors.neutral500, fontSize: '12px' }}>
                        <span>{task.category}</span>
                        <span>•</span>
                        <span>{task.assignedRole}</span>
                        <span>•</span>
                        <span style={{ color: isOverdue ? colors.danger : colors.neutral500 }}>
                          Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                          {isOverdue && ' (Overdue)'}
                        </span>
                      </div>

                      {/* Blocker Alert */}
                      {task.status === 'blocked' && task.blockerReason && (
                        <div style={{
                          marginTop: '12px',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          backgroundColor: `${colors.danger}10`,
                          border: `1px solid ${colors.danger}20`
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <AlertCircle size={14} color={colors.danger} />
                            <span style={{ fontSize: '12px', fontWeight: '600', color: colors.danger }}>Blocker</span>
                            {escalation && (
                              <span style={{
                                marginLeft: '8px',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                backgroundColor: escalation.escalationLevel === 'critical' ? colors.danger : escalation.escalationLevel === 'high' ? colors.warning : colors.neutral200,
                                color: escalation.escalationLevel === 'critical' || escalation.escalationLevel === 'high' ? colors.white : colors.neutral700,
                                fontSize: '10px',
                                fontWeight: '600'
                              }}>
                                {escalation.escalationLevel.toUpperCase()} PRIORITY
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: '12px', color: colors.neutral700 }}>{task.blockerReason}</p>
                          {escalation && (
                            <p style={{ fontSize: '11px', color: colors.neutral500, marginTop: '6px' }}>
                              Notify: {escalation.notifyRoles.join(', ')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <StatusBadge status={task.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* AI Assistant */}
      <AIAssistant
        practiceContext={{
          practiceName: practice.name,
          progress: practice.progress,
          blockedTasks,
          daysToDeadline
        }}
      />
    </div>
  );
};

// ============================================================================
// CAMPAIGN WIZARD
// ============================================================================

const CampaignWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    playbook: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    selectedPractices: [],
    cohorts: [
      { id: 'cohort-1', name: 'Cohort A', practices: [], startDate: '' },
      { id: 'cohort-2', name: 'Cohort B', practices: [], startDate: '' },
      { id: 'cohort-3', name: 'Cohort C', practices: [], startDate: '' }
    ]
  });
  const [generatedTasks, setGeneratedTasks] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const steps = [
    { num: 1, title: 'Campaign Details' },
    { num: 2, title: 'Select Practices' },
    { num: 3, title: 'Organize Cohorts' },
    { num: 4, title: 'Review & Launch' }
  ];

  const handleGenerateTasks = async () => {
    if (!formData.playbook) return;
    setIsGenerating(true);
    const tasks = await generateTaskDescriptions(formData.playbook);
    setGeneratedTasks(tasks);
    setIsGenerating(false);
  };

  const togglePractice = (practiceId) => {
    setFormData(prev => ({
      ...prev,
      selectedPractices: prev.selectedPractices.includes(practiceId)
        ? prev.selectedPractices.filter(id => id !== practiceId)
        : [...prev.selectedPractices, practiceId]
    }));
  };

  const assignToCohort = (practiceId, cohortId) => {
    setFormData(prev => ({
      ...prev,
      cohorts: prev.cohorts.map(cohort => ({
        ...cohort,
        practices: cohort.id === cohortId
          ? [...cohort.practices.filter(id => id !== practiceId), practiceId]
          : cohort.practices.filter(id => id !== practiceId)
      }))
    }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: colors.neutral700, marginBottom: '6px' }}>
                Campaign Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., EHR Modernization Q1 2024"
                style={baseStyles.input}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: colors.neutral700, marginBottom: '6px' }}>
                Select Playbook *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {mockPlaybooks.map(playbook => (
                  <div
                    key={playbook.id}
                    onClick={() => {
                      setFormData({ ...formData, playbook: playbook.name });
                      setGeneratedTasks(null);
                    }}
                    style={{
                      padding: '16px',
                      borderRadius: '10px',
                      border: `2px solid ${formData.playbook === playbook.name ? colors.primary : colors.neutral200}`,
                      backgroundColor: formData.playbook === playbook.name ? `${colors.primary}05` : colors.white,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: colors.neutral900 }}>{playbook.name}</h4>
                      {formData.playbook === playbook.name && <Check size={18} color={colors.primary} />}
                    </div>
                    <p style={{ fontSize: '12px', color: colors.neutral500, marginBottom: '8px' }}>{playbook.description}</p>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: colors.neutral400 }}>
                      <span>{playbook.taskCount} tasks</span>
                      <span>•</span>
                      <span>~{playbook.estimatedDays} days</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Task Generator */}
            {formData.playbook && (
              <div style={{
                padding: '16px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #8b5cf615 0%, #6366f115 100%)',
                border: '1px solid #8b5cf630'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Sparkles size={18} color="#8b5cf6" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: colors.neutral900 }}>AI Task Generator</span>
                </div>
                <p style={{ fontSize: '13px', color: colors.neutral600, marginBottom: '12px' }}>
                  Generate a comprehensive task list based on your selected playbook using AI analysis.
                </p>
                <button
                  onClick={handleGenerateTasks}
                  disabled={isGenerating}
                  style={{
                    ...baseStyles.button,
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    color: colors.white,
                    opacity: isGenerating ? 0.7 : 1
                  }}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      Generating Tasks...
                    </>
                  ) : (
                    <>
                      <Brain size={16} />
                      Generate Task Playbook
                    </>
                  )}
                </button>

                {generatedTasks && (
                  <div style={{ marginTop: '16px', padding: '12px', backgroundColor: colors.white, borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <Check size={16} color={colors.success} />
                      <span style={{ fontSize: '13px', fontWeight: '600', color: colors.success }}>
                        Generated {generatedTasks.taskCount} tasks
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                      {generatedTasks.categories.map(cat => (
                        <span key={cat} style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: colors.neutral100,
                          fontSize: '11px',
                          color: colors.neutral600
                        }}>
                          {cat}
                        </span>
                      ))}
                    </div>
                    <p style={{ fontSize: '12px', color: colors.neutral500 }}>
                      {generatedTasks.criticalPathCount} critical path items • ~{generatedTasks.estimatedDuration} day timeline
                    </p>
                  </div>
                )}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: colors.neutral700, marginBottom: '6px' }}>
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                style={{ ...baseStyles.input, width: 'auto' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: colors.neutral700, marginBottom: '6px' }}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the goals and scope of this implementation campaign..."
                rows={3}
                style={{ ...baseStyles.input, resize: 'vertical' }}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <p style={{ fontSize: '14px', color: colors.neutral600, marginBottom: '20px' }}>
              Select the practices that will participate in this campaign.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {mockPractices.map(practice => (
                <div
                  key={practice.id}
                  onClick={() => togglePractice(practice.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: `2px solid ${formData.selectedPractices.includes(practice.id) ? colors.primary : colors.neutral200}`,
                    backgroundColor: formData.selectedPractices.includes(practice.id) ? `${colors.primary}05` : colors.white,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: colors.neutral900, marginBottom: '4px' }}>
                        {practice.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: colors.neutral500 }}>
                        {practice.location} • {practice.state}
                      </p>
                    </div>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      border: `2px solid ${formData.selectedPractices.includes(practice.id) ? colors.primary : colors.neutral300}`,
                      backgroundColor: formData.selectedPractices.includes(practice.id) ? colors.primary : colors.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {formData.selectedPractices.includes(practice.id) && <Check size={14} color={colors.white} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '13px', color: colors.neutral500, marginTop: '16px' }}>
              {formData.selectedPractices.length} practices selected
            </p>
          </div>
        );

      case 3:
        return (
          <div>
            <p style={{ fontSize: '14px', color: colors.neutral600, marginBottom: '20px' }}>
              Organize selected practices into cohorts for phased rollout.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {formData.cohorts.map(cohort => (
                <div key={cohort.id} style={{ ...baseStyles.card, padding: '16px' }}>
                  <input
                    type="text"
                    value={cohort.name}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      cohorts: prev.cohorts.map(c => c.id === cohort.id ? { ...c, name: e.target.value } : c)
                    }))}
                    style={{ ...baseStyles.input, fontWeight: '600', marginBottom: '12px' }}
                  />
                  <div>
                    <label style={{ fontSize: '12px', color: colors.neutral500, marginBottom: '4px', display: 'block' }}>
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={cohort.startDate}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        cohorts: prev.cohorts.map(c => c.id === cohort.id ? { ...c, startDate: e.target.value } : c)
                      }))}
                      style={{ ...baseStyles.input, marginBottom: '12px' }}
                    />
                  </div>
                  <div style={{ minHeight: '120px', padding: '8px', backgroundColor: colors.neutral50, borderRadius: '8px' }}>
                    {formData.selectedPractices
                      .filter(pid => cohort.practices.includes(pid))
                      .map(pid => {
                        const practice = mockPractices.find(p => p.id === pid);
                        return (
                          <div key={pid} style={{
                            padding: '8px',
                            backgroundColor: colors.white,
                            borderRadius: '6px',
                            marginBottom: '6px',
                            fontSize: '12px'
                          }}>
                            {practice?.name}
                          </div>
                        );
                      })}
                    {cohort.practices.length === 0 && (
                      <p style={{ fontSize: '12px', color: colors.neutral400, textAlign: 'center', padding: '20px' }}>
                        Drop practices here
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px' }}>
              <p style={{ fontSize: '13px', fontWeight: '500', color: colors.neutral700, marginBottom: '12px' }}>
                Unassigned Practices
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {formData.selectedPractices
                  .filter(pid => !formData.cohorts.some(c => c.practices.includes(pid)))
                  .map(pid => {
                    const practice = mockPractices.find(p => p.id === pid);
                    return (
                      <div key={pid} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          padding: '6px 12px',
                          backgroundColor: colors.neutral100,
                          borderRadius: '6px',
                          fontSize: '12px'
                        }}>
                          {practice?.name}
                        </span>
                        <select
                          onChange={e => assignToCohort(pid, e.target.value)}
                          style={{ ...baseStyles.input, width: 'auto', padding: '4px 8px', fontSize: '12px' }}
                          defaultValue=""
                        >
                          <option value="" disabled>Assign to...</option>
                          {formData.cohorts.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <div style={{ ...baseStyles.card, marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.neutral900, marginBottom: '16px' }}>
                Campaign Summary
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: colors.neutral500, marginBottom: '4px' }}>Campaign Name</p>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: colors.neutral900 }}>{formData.name || 'Not specified'}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: colors.neutral500, marginBottom: '4px' }}>Playbook</p>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: colors.neutral900 }}>{formData.playbook || 'Not selected'}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: colors.neutral500, marginBottom: '4px' }}>Start Date</p>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: colors.neutral900 }}>{formData.startDate ? format(new Date(formData.startDate), 'MMM d, yyyy') : 'Not set'}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: colors.neutral500, marginBottom: '4px' }}>Practices</p>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: colors.neutral900 }}>{formData.selectedPractices.length} selected</p>
                </div>
              </div>
            </div>

            {generatedTasks && (
              <div style={{ ...baseStyles.card, marginBottom: '20px', background: 'linear-gradient(135deg, #8b5cf605 0%, #6366f105 100%)', border: '1px solid #8b5cf620' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Sparkles size={18} color="#8b5cf6" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: colors.neutral900 }}>AI-Generated Tasks</span>
                </div>
                <p style={{ fontSize: '13px', color: colors.neutral600 }}>
                  {generatedTasks.taskCount} tasks will be automatically created for each practice, including {generatedTasks.criticalPathCount} critical path items.
                </p>
              </div>
            )}

            <div style={{ ...baseStyles.card }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: colors.neutral900, marginBottom: '12px' }}>
                Cohort Organization
              </h4>
              {formData.cohorts.map(cohort => {
                const cohortPractices = formData.selectedPractices.filter(pid => cohort.practices.includes(pid));
                if (cohortPractices.length === 0) return null;
                return (
                  <div key={cohort.id} style={{ marginBottom: '12px', padding: '12px', backgroundColor: colors.neutral50, borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '500', color: colors.neutral900 }}>{cohort.name}</span>
                      <span style={{ fontSize: '12px', color: colors.neutral500 }}>
                        {cohort.startDate ? format(new Date(cohort.startDate), 'MMM d, yyyy') : 'Start date not set'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {cohortPractices.map(pid => {
                        const practice = mockPractices.find(p => p.id === pid);
                        return (
                          <span key={pid} style={{
                            padding: '4px 8px',
                            backgroundColor: colors.white,
                            borderRadius: '4px',
                            fontSize: '12px',
                            color: colors.neutral700
                          }}>
                            {practice?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={baseStyles.container}>
      <Navigation currentView="wizard" />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
        {/* Progress Stepper */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {steps.map((s, i) => (
              <React.Fragment key={s.num}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: step >= s.num ? colors.primary : colors.neutral200,
                    color: step >= s.num ? colors.white : colors.neutral500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    {step > s.num ? <Check size={18} /> : s.num}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: step === s.num ? '600' : '400',
                    color: step >= s.num ? colors.neutral900 : colors.neutral500
                  }}>
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: '2px',
                    backgroundColor: step > s.num ? colors.primary : colors.neutral200,
                    margin: '0 16px'
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div style={{ ...baseStyles.card, marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.neutral900, marginBottom: '24px' }}>
            {steps[step - 1].title}
          </h2>
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/dashboard')}
            style={{
              ...baseStyles.button,
              backgroundColor: colors.white,
              color: colors.neutral700,
              border: `1px solid ${colors.neutral300}`
            }}
          >
            <ChevronLeft size={18} />
            {step > 1 ? 'Back' : 'Cancel'}
          </button>
          <button
            onClick={() => {
              if (step < 4) {
                setStep(step + 1);
              } else {
                alert('Campaign created successfully!');
                navigate('/dashboard');
              }
            }}
            style={{
              ...baseStyles.button,
              backgroundColor: colors.primary,
              color: colors.white
            }}
          >
            {step < 4 ? 'Continue' : 'Launch Campaign'}
            {step < 4 ? <ChevronRight size={18} /> : <PlayCircle size={18} />}
          </button>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// LANDING PAGE COMPONENT
// ============================================================================

const LandingPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeTab, setActiveTab] = useState('predict');

  // Blue brand colors matching the dashboard
  const brand = {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    primaryLight: '#60a5fa',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #eff6ff 100%)'
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      background: '#ffffff',
      minHeight: '100vh'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 0'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo - Matching screenshot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: brand.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={26} color="white" />
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: brand.primaryDark
            }}>
              OnboardHealth
            </div>
          </div>

          {/* Nav Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px'
          }}>
            <a href="#features" style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#475569',
              textDecoration: 'none'
            }}>Features</a>
            <a href="#ai" style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#475569',
              textDecoration: 'none'
            }}>AI Capabilities</a>
            <a href="#pricing" style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#475569',
              textDecoration: 'none'
            }}>Pricing</a>
            <Link to="/dashboard" style={{
              padding: '12px 28px',
              background: brand.gradient,
              color: 'white',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}>
              View Demo
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: brand.bgGradient,
        padding: '80px 40px 100px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}>
            {/* Left Column */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                background: 'white',
                borderRadius: '999px',
                marginBottom: '24px',
                border: `1px solid ${brand.primary}40`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <Sparkles size={16} color={brand.primary} />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: brand.primaryDark
                }}>
                  AI-Powered MSO Platform
                </span>
              </div>

              <h1 style={{
                fontSize: '56px',
                fontWeight: '800',
                color: brand.primaryDark,
                lineHeight: '1.1',
                marginBottom: '24px'
              }}>
                Healthcare Implementation
                <br />
                <span style={{ color: brand.primary }}>Platform</span>
              </h1>

              <p style={{
                fontSize: '20px',
                color: '#475569',
                lineHeight: '1.6',
                marginBottom: '40px',
                maxWidth: '540px'
              }}>
                Streamlined workflows for patient or partner onboarding, service launches, and facility setup. AI predicts delays 3 weeks early.
              </p>

              {/* CTA Buttons */}
              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '48px'
              }}>
                <Link to="/signup" style={{
                  padding: '16px 32px',
                  background: brand.gradient,
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.35)'
                }}>
                  Get Started Free
                  <ArrowRight size={18} />
                </Link>

                <Link to="/dashboard" style={{
                  padding: '16px 32px',
                  background: 'white',
                  color: brand.primaryDark,
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <PlayCircle size={18} />
                  View Demo
                </Link>
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '32px'
              }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: brand.primaryDark }}>$250K+</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Annual Savings</div>
                </div>
                <div style={{ width: '1px', height: '40px', background: '#cbd5e1' }} />
                <div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: brand.primaryDark }}>3 Weeks</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Earlier Detection</div>
                </div>
                <div style={{ width: '1px', height: '40px', background: '#cbd5e1' }} />
                <div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: brand.primaryDark }}>60%</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Less Tickets</div>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '20px',
                  background: brand.gradient,
                  color: 'white'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <Brain size={22} />
                    <div style={{ fontSize: '16px', fontWeight: '700' }}>AI Delay Prediction</div>
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Analyzing 47 tasks across 12 practices...
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  <div style={{
                    padding: '14px',
                    background: '#fef2f2',
                    border: '2px solid #fca5a5',
                    borderRadius: '10px',
                    marginBottom: '14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <AlertCircle size={16} color="#dc2626" />
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#991b1b' }}>
                        High Risk: 12-Day Delay Predicted
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#7f1d1d' }}>
                      Harbor Health Clinic has 3 critical path blockers.
                    </div>
                  </div>

                  {['Critical vendor delay', 'Understaffed team', 'Missing compliance docs'].map((risk, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px',
                      background: '#f8fafc',
                      borderRadius: '6px',
                      marginBottom: '8px'
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
                      <div style={{ fontSize: '13px', color: '#475569' }}>{risk}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              <div style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                padding: '10px 18px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '999px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'white',
                fontSize: '13px',
                fontWeight: '700'
              }}>
                <Sparkles size={14} />
                AI Powered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section id="ai" style={{ padding: '80px 40px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: `${brand.primary}15`,
              borderRadius: '999px',
              marginBottom: '20px'
            }}>
              <Brain size={16} color={brand.primary} />
              <span style={{ fontSize: '14px', fontWeight: '700', color: brand.primaryDark }}>5 AI Features</span>
            </div>
            <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
              AI That Actually Works
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              Not gimmicks. Real AI features that save time and prevent costly delays.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {[
              { icon: Brain, title: 'Delay Prediction', desc: 'Predicts delays 2-3 weeks early' },
              { icon: Zap, title: 'Task Generator', desc: '25-35 tasks in 30 seconds' },
              { icon: Bot, title: 'AI Assistant', desc: '24/7 chatbot for practices' },
              { icon: AlertCircle, title: 'Smart Escalation', desc: 'Auto-routes blockers' },
              { icon: Shield, title: 'Compliance Check', desc: 'State-specific validation' }
            ].map((f, i) => (
              <div key={i} style={{
                padding: '24px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: brand.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <f.icon size={24} color="white" />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>{f.title}</h4>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '80px 40px', background: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
              Everything Your MSO Needs
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b' }}>
              9 core features for complete implementation management
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { icon: Target, title: 'Multi-Location Rollouts', desc: 'Cohort-based phased implementations' },
              { icon: Shield, title: 'State Compliance', desc: 'CA/TX/NY requirements tracking' },
              { icon: Users, title: 'Stakeholder Assignment', desc: 'Role-based task allocation' },
              { icon: AlertTriangle, title: 'Auto-Escalation', desc: 'Automatic blocker notifications' },
              { icon: Building2, title: 'Vendor Coordination', desc: 'SLA tracking & portal access' },
              { icon: BarChart3, title: 'Health Monitoring', desc: 'Post-launch metrics' },
              { icon: FileText, title: 'Playbook Library', desc: 'Reusable templates' },
              { icon: TrendingUp, title: 'Resource Tracking', desc: 'Support time monitoring' },
              { icon: MessageSquare, title: 'Communication Hub', desc: 'Threaded announcements' }
            ].map((f, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  padding: '28px',
                  background: hoveredFeature === i ? '#f8fafc' : 'white',
                  border: `2px solid ${hoveredFeature === i ? brand.primary : '#e2e8f0'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: hoveredFeature === i ? brand.gradient : '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <f.icon size={22} color={hoveredFeature === i ? 'white' : '#64748b'} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>{f.title}</h4>
                <p style={{ fontSize: '14px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 40px',
        background: brand.gradient,
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '800', color: 'white', marginBottom: '20px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>
            See why MSOs are switching from Monday.com and Excel to OnboardHealth.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/signup" style={{
              padding: '16px 32px',
              background: 'white',
              color: brand.primaryDark,
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Sign Up Free
              <ArrowRight size={18} />
            </Link>
            <Link to="/dashboard" style={{
              padding: '16px 32px',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              textDecoration: 'none'
            }}>
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px',
        background: brand.primaryDark,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
          <CheckCircle2 size={24} color={brand.primaryLight} />
          <span style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>OnboardHealth</span>
        </div>
        <div style={{ fontSize: '14px' }}>
          © 2025 OnboardHealth. Powered by Diamond Element Consulting.
        </div>
      </footer>
    </div>
  );
};

// ============================================================================
// SIGNUP PAGE COMPONENT - Request Demo Form
// ============================================================================

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', role: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const brand = {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #eff6ff 100%)'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save signup to localStorage
    const signups = JSON.parse(localStorage.getItem('onboardhealth_signups') || '[]');
    const newSignup = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    signups.push(newSignup);
    localStorage.setItem('onboardhealth_signups', JSON.stringify(signups));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: brand.bgGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          padding: '48px',
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <CheckCircle2 size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
            Thank You, {formData.name.split(' ')[0]}!
          </h1>
          <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '24px', lineHeight: '1.6' }}>
            Your demo request has been submitted. We'll reach out within 24 hours to schedule a personalized walkthrough of OnboardHealth.
          </p>
          <div style={{
            padding: '20px',
            background: '#f8fafc',
            borderRadius: '12px',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>What happens next:</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: brand.gradient, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>1</div>
              <span style={{ fontSize: '14px', color: '#475569' }}>We'll review your request</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: brand.gradient, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>2</div>
              <span style={{ fontSize: '14px', color: '#475569' }}>Schedule a demo at your convenience</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: brand.gradient, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>3</div>
              <span style={{ fontSize: '14px', color: '#475569' }}>Get full access to explore the platform</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/" style={{
              padding: '12px 24px',
              background: brand.gradient,
              color: 'white',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              Back to Home
            </Link>
            <Link to="/dashboard" style={{
              padding: '12px 24px',
              background: 'white',
              color: brand.primaryDark,
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              Preview Demo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: brand.bgGradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        padding: '48px',
        width: '100%',
        maxWidth: '500px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: brand.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <CheckCircle2 size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: brand.primaryDark, marginBottom: '8px' }}>
            OnboardHealth
          </h1>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: brand.primary, marginBottom: '8px' }}>
            Request a Demo
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            See how OnboardHealth can transform your MSO operations
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Smith"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(555) 123-4567"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Work Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="john@company.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Company/MSO Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Your Organization"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Your Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  background: 'white'
                }}
              >
                <option value="">Select role...</option>
                <option value="ceo">CEO / Executive</option>
                <option value="coo">COO / Operations</option>
                <option value="pm">Project Manager</option>
                <option value="it">IT Director</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Tell us about your needs
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="What challenges are you looking to solve? How many practices do you manage?"
              rows={3}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: brand.gradient,
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            Request Demo
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <Link to="/dashboard" style={{ fontSize: '14px', fontWeight: '600', color: brand.primary, textDecoration: 'none' }}>
            Or preview the demo now →
          </Link>
        </div>

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>
            Powered by Diamond Element Consulting
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ADMIN PAGE - View Signups
// ============================================================================

const AdminPage = () => {
  const navigate = useNavigate();
  const [signups, setSignups] = useState([]);
  const [filter, setFilter] = useState('all');

  const brand = {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('onboardhealth_signups') || '[]');
    setSignups(stored.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
  }, []);

  const updateStatus = (id, status) => {
    const updated = signups.map(s => s.id === id ? {...s, status} : s);
    setSignups(updated);
    localStorage.setItem('onboardhealth_signups', JSON.stringify(updated));
  };

  const deleteSignup = (id) => {
    const updated = signups.filter(s => s.id !== id);
    setSignups(updated);
    localStorage.setItem('onboardhealth_signups', JSON.stringify(updated));
  };

  const filteredSignups = filter === 'all' ? signups : signups.filter(s => s.status === filter);

  const statusColors = {
    new: { bg: '#dbeafe', color: '#1d4ed8' },
    contacted: { bg: '#fef3c7', color: '#b45309' },
    scheduled: { bg: '#d1fae5', color: '#047857' },
    completed: { bg: '#f3f4f6', color: '#6b7280' }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: brand.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CheckCircle2 size={22} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: brand.primaryDark }}>OnboardHealth Admin</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Demo Request Management</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/dashboard" style={{
            padding: '10px 20px',
            background: 'white',
            color: brand.primaryDark,
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            View Demo
          </Link>
          <Link to="/" style={{
            padding: '10px 20px',
            background: brand.gradient,
            color: 'white',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            Landing Page
          </Link>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '32px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          {[
            { label: 'Total Requests', value: signups.length, color: brand.primary },
            { label: 'New', value: signups.filter(s => s.status === 'new').length, color: '#3b82f6' },
            { label: 'Contacted', value: signups.filter(s => s.status === 'contacted').length, color: '#f59e0b' },
            { label: 'Scheduled', value: signups.filter(s => s.status === 'scheduled').length, color: '#10b981' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {['all', 'new', 'contacted', 'scheduled', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: filter === f ? brand.gradient : '#f1f5f9',
                color: filter === f ? 'white' : '#64748b',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          {filteredSignups.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <Users size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
              <div style={{ fontSize: '16px', color: '#64748b' }}>No demo requests yet</div>
              <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '8px' }}>
                Share your landing page to start receiving requests
              </p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Contact</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Company</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Message</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                  <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSignups.map(signup => (
                  <tr key={signup.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '2px' }}>{signup.name}</div>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>{signup.email}</div>
                      {signup.phone && <div style={{ fontSize: '13px', color: '#64748b' }}>{signup.phone}</div>}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: '500', color: '#374151' }}>{signup.company}</div>
                      {signup.role && <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'capitalize' }}>{signup.role}</div>}
                    </td>
                    <td style={{ padding: '16px 20px', maxWidth: '200px' }}>
                      <div style={{ fontSize: '13px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {signup.message || '-'}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#64748b' }}>
                      {new Date(signup.submittedAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <select
                        value={signup.status}
                        onChange={(e) => updateStatus(signup.id, e.target.value)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          background: statusColors[signup.status]?.bg || '#f1f5f9',
                          color: statusColors[signup.status]?.color || '#64748b',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button
                        onClick={() => deleteSignup(signup.id)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #fca5a5',
                          background: '#fef2f2',
                          color: '#dc2626',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// APP COMPONENT
// ============================================================================

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/dashboard" element={<CorporateDashboard />} />
      <Route path="/practice/:practiceId" element={<PracticeView />} />
      <Route path="/campaign/new" element={<CampaignWizard />} />
    </Routes>
  );
};

export default App;
