// OnboardHealth MSO - Mock AI Helpers
// These functions simulate AI features using intelligent rule-based logic
// No API keys required - costs $0 to run

// Utility to simulate API delay for realism
const simulateDelay = (min = 500, max = 2000) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Check if AI is enabled (always true for demo)
export const isAIEnabled = () => true;

// Get AI status message
export const getAIStatusMessage = () => "AI features enabled (Demo Mode)";

// 1. AI Delay Prediction
// Analyzes practice data to predict implementation delays
export const predictImplementationDelay = async (practice, tasks, campaign) => {
  await simulateDelay(800, 1500);

  const blockedTasks = tasks.filter(t => t.status === 'blocked');
  const criticalBlockers = blockedTasks.filter(t => t.criticalPath);
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const progress = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  // Calculate days to deadline
  const deadline = new Date(campaign.endDate);
  const today = new Date();
  const daysToDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

  // Risk scoring algorithm
  let riskScore = 0;
  const riskFactors = [];

  // Factor 1: Blocked tasks
  if (blockedTasks.length >= 3) {
    riskScore += 30;
    riskFactors.push(`${blockedTasks.length} blocked tasks requiring immediate attention`);
  } else if (blockedTasks.length >= 1) {
    riskScore += 15;
    riskFactors.push(`${blockedTasks.length} blocked task(s) may cause cascading delays`);
  }

  // Factor 2: Critical path blockers
  if (criticalBlockers.length > 0) {
    riskScore += 25;
    riskFactors.push(`${criticalBlockers.length} critical path item(s) blocked`);
  }

  // Factor 3: Progress vs timeline
  const expectedProgress = Math.max(0, Math.min(100, (1 - daysToDeadline / 60) * 100));
  if (progress < expectedProgress - 20) {
    riskScore += 20;
    riskFactors.push(`Progress (${Math.round(progress)}%) significantly behind expected (${Math.round(expectedProgress)}%)`);
  } else if (progress < expectedProgress - 10) {
    riskScore += 10;
    riskFactors.push(`Progress slightly behind schedule`);
  }

  // Factor 4: Time pressure
  if (daysToDeadline < 14 && progress < 70) {
    riskScore += 20;
    riskFactors.push(`Only ${daysToDeadline} days remaining with ${Math.round(progress)}% complete`);
  } else if (daysToDeadline < 30 && progress < 50) {
    riskScore += 10;
    riskFactors.push(`Timeline pressure: ${daysToDeadline} days for ${Math.round(100 - progress)}% remaining`);
  }

  // Determine risk level
  let riskLevel = 'low';
  let prediction = 'On track for timely completion';

  if (riskScore >= 50) {
    riskLevel = 'critical';
    prediction = 'High probability of missing deadline without intervention';
  } else if (riskScore >= 30) {
    riskLevel = 'high';
    prediction = 'Likely to experience delays without proactive management';
  } else if (riskScore >= 15) {
    riskLevel = 'medium';
    prediction = 'Some risk factors present - monitor closely';
  }

  // Generate recommendations
  const recommendations = [];
  if (criticalBlockers.length > 0) {
    recommendations.push('Prioritize resolution of critical path blockers');
  }
  if (blockedTasks.length > 2) {
    recommendations.push('Schedule daily standup to address blockers');
  }
  if (progress < expectedProgress - 15) {
    recommendations.push('Consider adding resources or adjusting timeline');
  }
  if (daysToDeadline < 21) {
    recommendations.push('Implement accelerated implementation protocol');
  }

  return {
    practiceId: practice.id,
    practiceName: practice.name,
    riskLevel,
    riskScore,
    prediction,
    riskFactors,
    recommendations,
    metrics: {
      progress: Math.round(progress),
      blockedTasks: blockedTasks.length,
      criticalBlockers: criticalBlockers.length,
      daysToDeadline
    },
    generatedAt: new Date().toISOString()
  };
};

// 2. Smart Task Generator
// Creates task playbooks based on campaign/playbook type
export const generateTaskDescriptions = async (playbookName, industry = 'healthcare') => {
  await simulateDelay(1000, 2500);

  const playbooks = {
    'ehr-implementation': {
      name: 'EHR Modernization',
      tasks: [
        { title: 'Complete vendor assessment questionnaire', category: 'Vendor', daysOffset: 0, duration: 3, criticalPath: true, role: 'Practice Manager' },
        { title: 'Sign data migration agreement', category: 'Legal', daysOffset: 3, duration: 2, criticalPath: true, role: 'Practice Manager' },
        { title: 'Submit IT infrastructure requirements', category: 'Technical', daysOffset: 2, duration: 5, criticalPath: false, role: 'IT Lead' },
        { title: 'Complete staff training needs assessment', category: 'Training', daysOffset: 5, duration: 3, criticalPath: false, role: 'Clinical Lead' },
        { title: 'Review and approve data mapping document', category: 'Technical', daysOffset: 7, duration: 4, criticalPath: true, role: 'Practice Manager' },
        { title: 'Schedule hardware installation window', category: 'Technical', daysOffset: 10, duration: 2, criticalPath: false, role: 'IT Lead' },
        { title: 'Complete HIPAA security assessment', category: 'Compliance', daysOffset: 8, duration: 5, criticalPath: true, role: 'Compliance Officer' },
        { title: 'Configure user roles and permissions', category: 'Technical', daysOffset: 14, duration: 3, criticalPath: false, role: 'IT Lead' },
        { title: 'Migrate test patient records', category: 'Technical', daysOffset: 17, duration: 5, criticalPath: true, role: 'IT Lead' },
        { title: 'Conduct staff EHR training - Module 1', category: 'Training', daysOffset: 18, duration: 2, criticalPath: false, role: 'Clinical Lead' },
        { title: 'Conduct staff EHR training - Module 2', category: 'Training', daysOffset: 20, duration: 2, criticalPath: false, role: 'Clinical Lead' },
        { title: 'Validate data migration accuracy', category: 'Quality', daysOffset: 22, duration: 3, criticalPath: true, role: 'Practice Manager' },
        { title: 'Complete interface testing with lab systems', category: 'Technical', daysOffset: 24, duration: 4, criticalPath: false, role: 'IT Lead' },
        { title: 'Conduct go-live readiness assessment', category: 'Quality', daysOffset: 28, duration: 2, criticalPath: true, role: 'Practice Manager' },
        { title: 'Execute parallel operations period', category: 'Operations', daysOffset: 30, duration: 5, criticalPath: true, role: 'Clinical Lead' },
        { title: 'Complete post-go-live support plan', category: 'Operations', daysOffset: 32, duration: 3, criticalPath: false, role: 'Practice Manager' },
        { title: 'Decommission legacy system access', category: 'Technical', daysOffset: 40, duration: 2, criticalPath: false, role: 'IT Lead' },
        { title: 'Submit compliance attestation', category: 'Compliance', daysOffset: 42, duration: 1, criticalPath: true, role: 'Compliance Officer' },
        { title: 'Complete 30-day post-implementation review', category: 'Quality', daysOffset: 60, duration: 2, criticalPath: false, role: 'Practice Manager' },
        { title: 'Archive project documentation', category: 'Documentation', daysOffset: 62, duration: 1, criticalPath: false, role: 'Practice Manager' },
        { title: 'Configure clinical decision support alerts', category: 'Clinical', daysOffset: 16, duration: 4, criticalPath: false, role: 'Clinical Lead' },
        { title: 'Set up e-prescribing integration', category: 'Technical', daysOffset: 19, duration: 3, criticalPath: true, role: 'IT Lead' },
        { title: 'Configure patient portal access', category: 'Technical', daysOffset: 21, duration: 2, criticalPath: false, role: 'IT Lead' },
        { title: 'Train front desk on scheduling module', category: 'Training', daysOffset: 23, duration: 2, criticalPath: false, role: 'Practice Manager' },
        { title: 'Validate billing code mappings', category: 'Revenue', daysOffset: 25, duration: 3, criticalPath: true, role: 'Billing Manager' },
        { title: 'Test claims submission workflow', category: 'Revenue', daysOffset: 28, duration: 2, criticalPath: true, role: 'Billing Manager' },
        { title: 'Configure automated appointment reminders', category: 'Operations', daysOffset: 26, duration: 1, criticalPath: false, role: 'Practice Manager' },
        { title: 'Set up reporting dashboards', category: 'Analytics', daysOffset: 35, duration: 2, criticalPath: false, role: 'Practice Manager' }
      ]
    },
    'credentialing': {
      name: 'Provider Credentialing',
      tasks: [
        { title: 'Collect provider documentation package', category: 'Documentation', daysOffset: 0, duration: 5, criticalPath: true, role: 'Practice Manager' },
        { title: 'Verify medical licenses', category: 'Verification', daysOffset: 5, duration: 3, criticalPath: true, role: 'Credentialing Specialist' },
        { title: 'Confirm DEA registration status', category: 'Verification', daysOffset: 5, duration: 2, criticalPath: true, role: 'Credentialing Specialist' },
        { title: 'Submit primary source verification requests', category: 'Verification', daysOffset: 8, duration: 7, criticalPath: true, role: 'Credentialing Specialist' },
        { title: 'Complete CAQH profile update', category: 'Documentation', daysOffset: 3, duration: 4, criticalPath: true, role: 'Practice Manager' },
        { title: 'Submit Medicare enrollment application', category: 'Payer', daysOffset: 10, duration: 45, criticalPath: true, role: 'Credentialing Specialist' },
        { title: 'Submit Medicaid enrollment application', category: 'Payer', daysOffset: 10, duration: 60, criticalPath: true, role: 'Credentialing Specialist' },
        { title: 'Process commercial payer applications - Tier 1', category: 'Payer', daysOffset: 12, duration: 30, criticalPath: false, role: 'Credentialing Specialist' },
        { title: 'Process commercial payer applications - Tier 2', category: 'Payer', daysOffset: 15, duration: 30, criticalPath: false, role: 'Credentialing Specialist' },
        { title: 'Verify hospital privileges', category: 'Verification', daysOffset: 8, duration: 5, criticalPath: false, role: 'Credentialing Specialist' },
        { title: 'Complete malpractice history review', category: 'Verification', daysOffset: 10, duration: 3, criticalPath: true, role: 'Compliance Officer' },
        { title: 'Obtain malpractice insurance certificate', category: 'Documentation', daysOffset: 5, duration: 3, criticalPath: true, role: 'Practice Manager' },
        { title: 'Submit NPI validation', category: 'Verification', daysOffset: 2, duration: 1, criticalPath: true, role: 'Credentialing Specialist' },
        { title: 'Process re-credentialing applications', category: 'Maintenance', daysOffset: 20, duration: 14, criticalPath: false, role: 'Credentialing Specialist' },
        { title: 'Update provider directory listings', category: 'Operations', daysOffset: 55, duration: 5, criticalPath: false, role: 'Practice Manager' },
        { title: 'Configure EHR provider profiles', category: 'Technical', daysOffset: 60, duration: 2, criticalPath: false, role: 'IT Lead' },
        { title: 'Verify board certifications', category: 'Verification', daysOffset: 6, duration: 4, criticalPath: true, role: 'Credentialing Specialist' },
        { title: 'Complete background check authorization', category: 'Compliance', daysOffset: 3, duration: 2, criticalPath: true, role: 'Practice Manager' },
        { title: 'Process OIG/SAM exclusion check', category: 'Compliance', daysOffset: 7, duration: 1, criticalPath: true, role: 'Compliance Officer' },
        { title: 'Review and resolve payer discrepancies', category: 'Payer', daysOffset: 45, duration: 10, criticalPath: false, role: 'Credentialing Specialist' },
        { title: 'Set up provider in billing system', category: 'Revenue', daysOffset: 65, duration: 2, criticalPath: true, role: 'Billing Manager' },
        { title: 'Complete delegated credentialing agreement', category: 'Legal', daysOffset: 8, duration: 5, criticalPath: false, role: 'Practice Manager' },
        { title: 'Verify education and training history', category: 'Verification', daysOffset: 6, duration: 5, criticalPath: true, role: 'Credentialing Specialist' },
        { title: 'Process specialty society memberships', category: 'Documentation', daysOffset: 8, duration: 3, criticalPath: false, role: 'Credentialing Specialist' },
        { title: 'Complete credentialing committee review', category: 'Quality', daysOffset: 70, duration: 3, criticalPath: true, role: 'Medical Director' },
        { title: 'Issue welcome packet and orientation schedule', category: 'Onboarding', daysOffset: 75, duration: 2, criticalPath: false, role: 'Practice Manager' },
        { title: 'Archive credentialing file', category: 'Documentation', daysOffset: 80, duration: 1, criticalPath: false, role: 'Credentialing Specialist' }
      ]
    },
    'telemedicine': {
      name: 'Telemedicine Platform',
      tasks: [
        { title: 'Complete telemedicine vendor selection', category: 'Vendor', daysOffset: 0, duration: 5, criticalPath: true, role: 'Practice Manager' },
        { title: 'Review state telemedicine regulations', category: 'Compliance', daysOffset: 2, duration: 3, criticalPath: true, role: 'Compliance Officer' },
        { title: 'Configure virtual waiting room', category: 'Technical', daysOffset: 7, duration: 2, criticalPath: false, role: 'IT Lead' },
        { title: 'Set up provider video consultation profiles', category: 'Technical', daysOffset: 8, duration: 3, criticalPath: true, role: 'IT Lead' },
        { title: 'Integrate with EHR scheduling', category: 'Technical', daysOffset: 10, duration: 5, criticalPath: true, role: 'IT Lead' },
        { title: 'Configure telemedicine billing codes', category: 'Revenue', daysOffset: 12, duration: 3, criticalPath: true, role: 'Billing Manager' },
        { title: 'Train providers on platform usage', category: 'Training', daysOffset: 15, duration: 4, criticalPath: false, role: 'Clinical Lead' },
        { title: 'Train staff on virtual visit workflows', category: 'Training', daysOffset: 16, duration: 3, criticalPath: false, role: 'Practice Manager' },
        { title: 'Set up patient onboarding materials', category: 'Operations', daysOffset: 14, duration: 2, criticalPath: false, role: 'Practice Manager' },
        { title: 'Configure consent collection workflow', category: 'Compliance', daysOffset: 10, duration: 2, criticalPath: true, role: 'Compliance Officer' },
        { title: 'Test video quality and bandwidth', category: 'Technical', daysOffset: 18, duration: 2, criticalPath: false, role: 'IT Lead' },
        { title: 'Complete HIPAA compliance assessment', category: 'Compliance', daysOffset: 8, duration: 4, criticalPath: true, role: 'Compliance Officer' },
        { title: 'Set up prescription routing for telemedicine', category: 'Clinical', daysOffset: 15, duration: 3, criticalPath: true, role: 'Clinical Lead' },
        { title: 'Configure patient portal access', category: 'Technical', daysOffset: 17, duration: 2, criticalPath: false, role: 'IT Lead' },
        { title: 'Create emergency escalation protocols', category: 'Clinical', daysOffset: 12, duration: 2, criticalPath: true, role: 'Clinical Lead' },
        { title: 'Launch pilot with select providers', category: 'Operations', daysOffset: 20, duration: 5, criticalPath: true, role: 'Practice Manager' },
        { title: 'Collect pilot feedback and adjust', category: 'Quality', daysOffset: 25, duration: 3, criticalPath: false, role: 'Practice Manager' },
        { title: 'Full platform rollout', category: 'Operations', daysOffset: 28, duration: 2, criticalPath: true, role: 'Practice Manager' },
        { title: 'Set up telemedicine analytics dashboard', category: 'Analytics', daysOffset: 30, duration: 2, criticalPath: false, role: 'IT Lead' },
        { title: 'Document telemedicine workflows', category: 'Documentation', daysOffset: 30, duration: 3, criticalPath: false, role: 'Practice Manager' },
        { title: 'Configure multi-state licensing compliance', category: 'Compliance', daysOffset: 5, duration: 5, criticalPath: true, role: 'Compliance Officer' },
        { title: 'Set up interpreter services integration', category: 'Operations', daysOffset: 18, duration: 2, criticalPath: false, role: 'Practice Manager' },
        { title: 'Complete 30-day post-launch review', category: 'Quality', daysOffset: 58, duration: 2, criticalPath: false, role: 'Practice Manager' }
      ]
    },
    'billing': {
      name: 'Revenue Cycle Optimization',
      tasks: [
        { title: 'Complete current state revenue cycle assessment', category: 'Analysis', daysOffset: 0, duration: 5, criticalPath: true, role: 'Billing Manager' },
        { title: 'Identify denial pattern trends', category: 'Analysis', daysOffset: 3, duration: 4, criticalPath: true, role: 'Billing Manager' },
        { title: 'Review charge capture processes', category: 'Analysis', daysOffset: 5, duration: 3, criticalPath: false, role: 'Billing Manager' },
        { title: 'Audit coding accuracy', category: 'Quality', daysOffset: 7, duration: 5, criticalPath: true, role: 'Coding Specialist' },
        { title: 'Implement claim scrubbing rules', category: 'Technical', daysOffset: 12, duration: 4, criticalPath: true, role: 'IT Lead' },
        { title: 'Configure automated eligibility verification', category: 'Technical', daysOffset: 10, duration: 3, criticalPath: false, role: 'IT Lead' },
        { title: 'Set up denial management workflow', category: 'Operations', daysOffset: 15, duration: 4, criticalPath: true, role: 'Billing Manager' },
        { title: 'Train staff on clean claim submission', category: 'Training', daysOffset: 18, duration: 3, criticalPath: false, role: 'Billing Manager' },
        { title: 'Implement prior authorization tracking', category: 'Operations', daysOffset: 14, duration: 4, criticalPath: true, role: 'Practice Manager' },
        { title: 'Configure payment posting automation', category: 'Technical', daysOffset: 20, duration: 3, criticalPath: false, role: 'IT Lead' },
        { title: 'Set up patient statement workflows', category: 'Operations', daysOffset: 22, duration: 2, criticalPath: false, role: 'Billing Manager' },
        { title: 'Implement collection agency integration', category: 'Technical', daysOffset: 24, duration: 3, criticalPath: false, role: 'IT Lead' },
        { title: 'Configure revenue cycle dashboards', category: 'Analytics', daysOffset: 26, duration: 3, criticalPath: false, role: 'Billing Manager' },
        { title: 'Complete payer contract review', category: 'Revenue', daysOffset: 8, duration: 7, criticalPath: true, role: 'Practice Manager' },
        { title: 'Negotiate improved reimbursement rates', category: 'Revenue', daysOffset: 15, duration: 14, criticalPath: false, role: 'Practice Manager' },
        { title: 'Implement fee schedule updates', category: 'Revenue', daysOffset: 28, duration: 2, criticalPath: true, role: 'Billing Manager' },
        { title: 'Set up underpayment identification', category: 'Revenue', daysOffset: 25, duration: 3, criticalPath: false, role: 'Billing Manager' },
        { title: 'Configure coding compliance alerts', category: 'Compliance', daysOffset: 12, duration: 2, criticalPath: true, role: 'Compliance Officer' },
        { title: 'Document new revenue cycle procedures', category: 'Documentation', daysOffset: 30, duration: 3, criticalPath: false, role: 'Billing Manager' },
        { title: 'Complete staff competency assessments', category: 'Training', daysOffset: 32, duration: 3, criticalPath: false, role: 'Billing Manager' },
        { title: 'Launch optimized revenue cycle', category: 'Operations', daysOffset: 35, duration: 1, criticalPath: true, role: 'Practice Manager' },
        { title: 'Monitor KPIs for 30 days', category: 'Quality', daysOffset: 36, duration: 30, criticalPath: false, role: 'Billing Manager' },
        { title: 'Complete post-implementation ROI analysis', category: 'Analysis', daysOffset: 66, duration: 3, criticalPath: false, role: 'Practice Manager' }
      ]
    },
    'custom': {
      name: 'Custom Implementation',
      tasks: [
        { title: 'Complete project scope documentation', category: 'Planning', daysOffset: 0, duration: 3, criticalPath: true, role: 'Practice Manager' },
        { title: 'Identify key stakeholders', category: 'Planning', daysOffset: 2, duration: 2, criticalPath: true, role: 'Practice Manager' },
        { title: 'Conduct current state assessment', category: 'Analysis', daysOffset: 4, duration: 5, criticalPath: true, role: 'Practice Manager' },
        { title: 'Define success metrics', category: 'Planning', daysOffset: 7, duration: 2, criticalPath: true, role: 'Practice Manager' },
        { title: 'Create implementation timeline', category: 'Planning', daysOffset: 9, duration: 3, criticalPath: true, role: 'Practice Manager' },
        { title: 'Allocate resources and budget', category: 'Planning', daysOffset: 11, duration: 2, criticalPath: true, role: 'Practice Manager' },
        { title: 'Complete vendor/solution selection', category: 'Vendor', daysOffset: 12, duration: 5, criticalPath: true, role: 'Practice Manager' },
        { title: 'Review compliance requirements', category: 'Compliance', daysOffset: 14, duration: 3, criticalPath: true, role: 'Compliance Officer' },
        { title: 'Develop training plan', category: 'Training', daysOffset: 17, duration: 3, criticalPath: false, role: 'Clinical Lead' },
        { title: 'Configure technical infrastructure', category: 'Technical', daysOffset: 18, duration: 5, criticalPath: true, role: 'IT Lead' },
        { title: 'Complete integration testing', category: 'Technical', daysOffset: 23, duration: 4, criticalPath: true, role: 'IT Lead' },
        { title: 'Conduct user acceptance testing', category: 'Quality', daysOffset: 27, duration: 3, criticalPath: true, role: 'Practice Manager' },
        { title: 'Execute staff training', category: 'Training', daysOffset: 28, duration: 4, criticalPath: false, role: 'Clinical Lead' },
        { title: 'Complete go-live preparation', category: 'Operations', daysOffset: 32, duration: 2, criticalPath: true, role: 'Practice Manager' },
        { title: 'Execute go-live', category: 'Operations', daysOffset: 34, duration: 1, criticalPath: true, role: 'Practice Manager' },
        { title: 'Provide post-go-live support', category: 'Operations', daysOffset: 35, duration: 7, criticalPath: false, role: 'IT Lead' },
        { title: 'Collect user feedback', category: 'Quality', daysOffset: 40, duration: 3, criticalPath: false, role: 'Practice Manager' },
        { title: 'Document lessons learned', category: 'Documentation', daysOffset: 43, duration: 2, criticalPath: false, role: 'Practice Manager' },
        { title: 'Complete project closeout', category: 'Documentation', daysOffset: 45, duration: 2, criticalPath: true, role: 'Practice Manager' }
      ]
    }
  };

  // Map playbook name to key
  const playbookKey = playbookName.toLowerCase().includes('ehr') ? 'ehr-implementation' :
                      playbookName.toLowerCase().includes('credential') ? 'credentialing' :
                      playbookName.toLowerCase().includes('tele') ? 'telemedicine' :
                      playbookName.toLowerCase().includes('billing') || playbookName.toLowerCase().includes('revenue') ? 'billing' :
                      'custom';

  const selectedPlaybook = playbooks[playbookKey];

  return {
    playbookName: selectedPlaybook.name,
    taskCount: selectedPlaybook.tasks.length,
    tasks: selectedPlaybook.tasks,
    estimatedDuration: Math.max(...selectedPlaybook.tasks.map(t => t.daysOffset + t.duration)),
    categories: [...new Set(selectedPlaybook.tasks.map(t => t.category))],
    criticalPathCount: selectedPlaybook.tasks.filter(t => t.criticalPath).length,
    generatedAt: new Date().toISOString()
  };
};

// 3. Practice Manager Chatbot
// Pattern-matching responses for common implementation questions
export const getAssistantResponse = async (userMessage, context = {}) => {
  await simulateDelay(600, 1200);

  const message = userMessage.toLowerCase();
  const { practiceName, progress, blockedTasks, daysToDeadline } = context;

  // Pattern matching for common questions
  const patterns = [
    {
      matches: ['hello', 'hi', 'hey', 'help'],
      response: `Hello! I'm your OnboardHealth AI assistant. I can help you with implementation questions, task guidance, compliance requirements, and more. What would you like to know?`
    },
    {
      matches: ['status', 'how are we doing', 'progress', 'where are we'],
      response: practiceName
        ? `${practiceName} is currently at ${progress || 0}% completion with ${blockedTasks || 0} blocked tasks. ${daysToDeadline ? `You have ${daysToDeadline} days until your target deadline.` : ''} Would you like me to identify the highest priority items to focus on?`
        : `I can provide status updates once you're viewing a specific practice. Navigate to a practice view to see detailed progress information.`
    },
    {
      matches: ['blocker', 'blocked', 'stuck', 'issue', 'problem'],
      response: blockedTasks > 0
        ? `You currently have ${blockedTasks} blocked task(s). Blocked tasks are automatically escalated based on their priority and impact on the critical path. To resolve blockers faster, I recommend: 1) Documenting the specific issue in the task notes, 2) Identifying the responsible party, and 3) Setting a resolution deadline. Would you like guidance on a specific blocker?`
        : `Great news - there are no blocked tasks currently. To prevent future blockers, ensure you're proactively communicating with vendors and stakeholders, and flag potential issues early.`
    },
    {
      matches: ['deadline', 'due date', 'timeline', 'when'],
      response: daysToDeadline
        ? `Your implementation deadline is in ${daysToDeadline} days. ${daysToDeadline < 14 ? 'This is approaching quickly - prioritize critical path items and escalate any blockers immediately.' : 'You have adequate time if you maintain current velocity. Focus on completing tasks in priority order.'}`
        : `Deadline information is available in the practice view. Each campaign has a target completion date that drives task scheduling.`
    },
    {
      matches: ['compliance', 'hipaa', 'regulation', 'legal', 'requirement'],
      response: `Compliance tasks are automatically assigned based on your state's requirements. Key areas include: HIPAA security assessments, state-specific licensing verification, BAA agreements with vendors, and data handling protocols. Your compliance officer should review all regulatory tasks before sign-off. Would you like details on a specific compliance area?`
    },
    {
      matches: ['training', 'learn', 'onboard', 'teach'],
      response: `Training tasks are scheduled throughout the implementation timeline. Best practices include: 1) Complete role-based training modules before go-live, 2) Schedule hands-on practice sessions, 3) Identify super-users for each department, and 4) Plan for post-go-live refresher training. Would you like the recommended training sequence?`
    },
    {
      matches: ['vendor', 'contractor', 'third party', 'partner'],
      response: `Vendor coordination is managed through the Vendor Hub. Key activities include: tracking SLA compliance, managing deliverable timelines, and coordinating access requirements. Ensure all vendors have signed BAAs and completed security assessments before granting system access. Would you like to see your vendor status summary?`
    },
    {
      matches: ['escalate', 'urgent', 'critical', 'emergency'],
      response: `For urgent issues: 1) Mark the task as blocked with a clear description, 2) The system will automatically determine escalation priority based on critical path impact, 3) Stakeholders are notified via the communication feed. For true emergencies affecting patient care, contact your implementation lead directly. What specific issue needs escalation?`
    },
    {
      matches: ['next', 'priority', 'focus', 'should i do'],
      response: progress < 30
        ? `At the early stage of implementation, focus on: 1) Completing documentation and agreements, 2) Finalizing vendor selections, 3) Setting up technical prerequisites. These foundational tasks enable everything that follows.`
        : progress < 70
        ? `In the active implementation phase, prioritize: 1) Resolving any blocked tasks immediately, 2) Completing critical path items first, 3) Beginning staff training in parallel. Keep stakeholders informed of progress.`
        : `In the final stretch, focus on: 1) User acceptance testing, 2) Go-live preparation checklist, 3) Post-launch support planning. Ensure all compliance attestations are complete before go-live.`
    },
    {
      matches: ['report', 'metrics', 'dashboard', 'data'],
      response: `Implementation metrics are available on your dashboard, including: overall progress percentage, task completion rates, blocker counts, and timeline adherence. The Corporate Dashboard provides aggregate views across all practices. Would you like guidance on interpreting specific metrics?`
    }
  ];

  // Find matching pattern
  for (const pattern of patterns) {
    if (pattern.matches.some(keyword => message.includes(keyword))) {
      return {
        response: pattern.response,
        confidence: 0.85,
        suggestedActions: [],
        generatedAt: new Date().toISOString()
      };
    }
  }

  // Default response for unmatched queries
  return {
    response: `I understand you're asking about "${userMessage}". While I don't have a specific answer for that, I can help with: implementation status, blocked tasks, compliance requirements, training guidance, vendor coordination, and escalation procedures. Could you rephrase your question or select one of these topics?`,
    confidence: 0.5,
    suggestedActions: ['Check implementation status', 'View blocked tasks', 'Review compliance items'],
    generatedAt: new Date().toISOString()
  };
};

// 4. Smart Escalation Intelligence
// Determines escalation priority and notification routing
export const analyzeEscalation = async (task, practice, campaign) => {
  await simulateDelay(500, 1000);

  const today = new Date();
  const dueDate = new Date(task.dueDate);
  const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
  const campaignDeadline = new Date(campaign.endDate);
  const daysToDeadline = Math.ceil((campaignDeadline - today) / (1000 * 60 * 60 * 24));

  // Calculate urgency score
  let urgencyScore = 0;
  const escalationFactors = [];

  // Factor 1: Overdue status
  if (daysOverdue > 7) {
    urgencyScore += 40;
    escalationFactors.push(`Task is ${daysOverdue} days overdue`);
  } else if (daysOverdue > 3) {
    urgencyScore += 25;
    escalationFactors.push(`Task is ${daysOverdue} days overdue`);
  } else if (daysOverdue > 0) {
    urgencyScore += 15;
    escalationFactors.push(`Task is ${daysOverdue} day(s) overdue`);
  }

  // Factor 2: Critical path impact
  if (task.criticalPath) {
    urgencyScore += 30;
    escalationFactors.push('Task is on the critical path');
  }

  // Factor 3: Campaign deadline pressure
  if (daysToDeadline < 14) {
    urgencyScore += 20;
    escalationFactors.push(`Only ${daysToDeadline} days until campaign deadline`);
  } else if (daysToDeadline < 30) {
    urgencyScore += 10;
    escalationFactors.push('Campaign deadline approaching');
  }

  // Factor 4: Blocker type analysis
  const blockerReason = task.blockerReason?.toLowerCase() || '';
  if (blockerReason.includes('vendor') || blockerReason.includes('third party')) {
    urgencyScore += 10;
    escalationFactors.push('External dependency requiring vendor coordination');
  }
  if (blockerReason.includes('compliance') || blockerReason.includes('legal')) {
    urgencyScore += 15;
    escalationFactors.push('Compliance-related blocker requiring immediate attention');
  }

  // Determine escalation level
  let escalationLevel = 'standard';
  let notifyRoles = ['Practice Manager'];
  let recommendedAction = 'Monitor and follow standard resolution process';

  if (urgencyScore >= 70) {
    escalationLevel = 'critical';
    notifyRoles = ['Practice Manager', 'Implementation Director', 'Executive Sponsor'];
    recommendedAction = 'Immediate executive intervention required. Schedule emergency resolution meeting within 24 hours.';
  } else if (urgencyScore >= 45) {
    escalationLevel = 'high';
    notifyRoles = ['Practice Manager', 'Implementation Director'];
    recommendedAction = 'Escalate to implementation director. Develop contingency plan within 48 hours.';
  } else if (urgencyScore >= 25) {
    escalationLevel = 'medium';
    notifyRoles = ['Practice Manager', 'Team Lead'];
    recommendedAction = 'Increase monitoring frequency. Identify alternative approaches if not resolved within 3 days.';
  }

  return {
    taskId: task.id,
    taskTitle: task.title,
    escalationLevel,
    urgencyScore,
    escalationFactors,
    notifyRoles,
    recommendedAction,
    timeline: {
      daysOverdue: Math.max(0, daysOverdue),
      daysToDeadline
    },
    generatedAt: new Date().toISOString()
  };
};

// 5. Compliance Document Analyzer
// Validates documents against state-specific requirements
export const analyzeComplianceDocument = async (file, state, taskType) => {
  await simulateDelay(1200, 2000);

  // Simulated document analysis
  const fileSize = file?.size || Math.floor(Math.random() * 5000000);
  const fileName = file?.name || 'document.pdf';

  // State-specific requirements database
  const stateRequirements = {
    'CA': {
      name: 'California',
      specificRequirements: [
        'CMIA (Confidentiality of Medical Information Act) compliance statement',
        'California Consumer Privacy Act (CCPA) acknowledgment',
        'Knox-Keene license verification (if applicable)',
        'California Business and Professions Code compliance'
      ],
      additionalNotes: 'California has stringent privacy requirements that exceed HIPAA in some areas.'
    },
    'TX': {
      name: 'Texas',
      specificRequirements: [
        'Texas Medical Board license verification',
        'Texas Health and Safety Code compliance',
        'THCIC reporting requirements acknowledgment',
        'Texas Insurance Code compliance (if applicable)'
      ],
      additionalNotes: 'Texas requires specific state medical board documentation for all providers.'
    },
    'NY': {
      name: 'New York',
      specificRequirements: [
        'New York State Education Department license verification',
        'NYSDOH Article 28 compliance (if applicable)',
        'New York SHIELD Act compliance',
        'Medicaid Managed Care requirements'
      ],
      additionalNotes: 'New York has extensive documentation requirements for healthcare operations.'
    }
  };

  const stateInfo = stateRequirements[state] || stateRequirements['CA'];

  // Generate realistic findings
  const findings = [];
  const requiredItems = [];
  let complianceScore = 85;

  // Check for common issues (simulated)
  if (fileSize < 10000) {
    findings.push({
      severity: 'warning',
      message: 'Document appears unusually small. Verify all required sections are included.'
    });
    complianceScore -= 5;
  }

  if (fileSize > 10000000) {
    findings.push({
      severity: 'info',
      message: 'Large document detected. Consider splitting into sections for easier review.'
    });
  }

  // Random but realistic findings based on task type
  const possibleFindings = [
    { severity: 'success', message: 'HIPAA compliance attestation verified' },
    { severity: 'success', message: 'Required signatures detected on all authorization forms' },
    { severity: 'warning', message: 'Expiration date approaching on one or more licenses - renewal recommended within 60 days' },
    { severity: 'warning', message: `${stateInfo.name}-specific privacy disclosure may need update to latest template version` },
    { severity: 'info', message: 'Document formatting meets accessibility standards' },
    { severity: 'success', message: 'Provider NPI numbers validated against NPPES registry' },
    { severity: 'warning', message: 'Consider adding additional detail to the breach notification procedures section' }
  ];

  // Select 2-4 random findings
  const numFindings = 2 + Math.floor(Math.random() * 3);
  const shuffled = possibleFindings.sort(() => 0.5 - Math.random());
  findings.push(...shuffled.slice(0, numFindings));

  // Adjust compliance score based on findings
  findings.forEach(f => {
    if (f.severity === 'warning') complianceScore -= 3;
    if (f.severity === 'success') complianceScore += 2;
  });
  complianceScore = Math.min(98, Math.max(70, complianceScore));

  // Generate required items checklist
  const checklistItems = [
    { item: 'HIPAA Privacy Notice', status: Math.random() > 0.1 ? 'verified' : 'missing' },
    { item: 'Business Associate Agreement', status: Math.random() > 0.15 ? 'verified' : 'pending' },
    { item: stateInfo.specificRequirements[0], status: Math.random() > 0.2 ? 'verified' : 'needs-review' },
    { item: stateInfo.specificRequirements[1], status: Math.random() > 0.1 ? 'verified' : 'verified' },
    { item: 'Provider License Documentation', status: 'verified' },
    { item: 'Malpractice Insurance Certificate', status: Math.random() > 0.1 ? 'verified' : 'expiring-soon' }
  ];

  return {
    fileName,
    fileSize,
    state: stateInfo.name,
    taskType,
    complianceScore,
    overallStatus: complianceScore >= 90 ? 'compliant' : complianceScore >= 75 ? 'needs-attention' : 'non-compliant',
    findings: findings.sort((a, b) => {
      const order = { warning: 0, info: 1, success: 2 };
      return order[a.severity] - order[b.severity];
    }),
    checklist: checklistItems,
    stateSpecificNotes: stateInfo.additionalNotes,
    stateRequirements: stateInfo.specificRequirements,
    recommendations: [
      'Schedule compliance review meeting with legal team',
      'Update document retention policy per state requirements',
      'Verify all provider licenses are current'
    ],
    generatedAt: new Date().toISOString()
  };
};
