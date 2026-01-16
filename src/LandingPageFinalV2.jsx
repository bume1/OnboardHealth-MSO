import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  Brain,
  Shield,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Users,
  Zap,
  Clock,
  DollarSign,
  AlertCircle,
  Building2,
  FileCheck,
  Bot,
  Target,
  Calculator,
  PlayCircle,
  MapPin,
  UserCheck,
  Bell,
  Network,
  Activity,
  BookOpen,
  LineChart,
  MessageSquare,
  Check
} from 'lucide-react';

// ============================================================================
// FINAL LANDING PAGE - WITH RECOMMENDED BRANDING + 9 FEATURES + PRICING
// ============================================================================

const LandingPageFinal = () => {
  const [calculatorInputs, setCalculatorInputs] = useState({
    implementationsPerYear: 10
  });

  const calculateROI = () => {
    const avgCost = 302000;
    const annualCost = avgCost * calculatorInputs.implementationsPerYear;
    const withOnboardHealth = annualCost * 0.30;
    const savings = annualCost - withOnboardHealth;
    const investment = 60000;
    const roi = ((savings - investment) / investment * 100).toFixed(1);
    const paybackDays = Math.round((investment / savings) * 365);

    return { annualCost, withOnboardHealth, savings, investment, roi, paybackDays };
  };

  const roi = calculateROI();

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
        padding: '20px 0'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={24} color="white" strokeWidth={3} />
            </div>
            <div>
              <div style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#0f172a',
                lineHeight: '1'
              }}>
                OnboardHealth
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginTop: '2px'
              }}>
                MSO Edition
              </div>
            </div>
          </div>

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
            <a href="#pricing" style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#475569',
              textDecoration: 'none'
            }}>Pricing</a>
            <a href="#roi" style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#475569',
              textDecoration: 'none'
            }}>ROI Calculator</a>
            <Link to="/dashboard" style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
              color: 'white',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              transition: 'all 0.2s'
            }}>
              View Demo
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>


      {/* HERO SECTION - CLEAN LAYOUT: AI LEFT, HEADLINE RIGHT, COST BOTTOM */}
      <section style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        padding: '100px 40px 120px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          {/* TOP: AI Demo + Headline */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '500px 1fr',
            gap: '80px',
            alignItems: 'center',
            marginBottom: '80px'
          }}>
            {/* LEFT: AI Delay Prediction */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  padding: '6px 14px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '999px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '700',
                  zIndex: 10
                }}>
                  <Brain size={12} />
                  AI Powered
                </div>

                <div style={{
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                  color: 'white'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '8px'
                  }}>
                    <AlertCircle size={20} />
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700'
                    }}>
                      AI Delay Prediction
                    </div>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    opacity: 0.9
                  }}>
                    Analyzing 47 tasks across 12 practices...
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{
                    padding: '18px',
                    background: '#fef2f2',
                    border: '2px solid #fca5a5',
                    borderRadius: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '10px'
                    }}>
                      <AlertCircle size={18} color="#dc2626" />
                      <div style={{
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#991b1b'
                      }}>
                        High Risk: 12-Day Delay
                      </div>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#7f1d1d',
                      lineHeight: '1.5',
                      marginBottom: '12px'
                    }}>
                      Harbor Health has 3 critical blockers
                    </div>
                    {['Vendor delay ($50K revenue)', 'Understaffed team', 'Missing compliance'].map((risk, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px',
                        background: 'white',
                        borderRadius: '6px',
                        marginBottom: i < 2 ? '6px' : '0',
                        fontSize: '13px',
                        color: '#475569'
                      }}>
                        <div style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: '#ef4444',
                          flexShrink: 0
                        }} />
                        {risk}
                      </div>
                    ))}
                  </div>

                  <div style={{
                    padding: '14px',
                    background: '#f0fdf4',
                    border: '2px solid #86efac',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#166534',
                      marginBottom: '4px'
                    }}>
                      AI Prevented Cost:
                    </div>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: '800',
                      color: '#15803d'
                    }}>
                      $80,000
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Headline + Message */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                background: 'white',
                borderRadius: '999px',
                border: '1px solid #e2e8f0',
                marginBottom: '32px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}>
                <Brain size={16} color="#2563eb" />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#475569'
                }}>
                  AI-Powered MSO Implementation Platform
                </span>
              </div>

              <h1 style={{
                fontSize: '58px',
                fontWeight: '800',
                color: '#0f172a',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                marginBottom: '28px'
              }}>
                Your Team Just Burned{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block'
                }}>
                  $147,000
                </span>
                <br />
                Coordinating What AI Could Do in 30 Seconds
              </h1>

              <p style={{
                fontSize: '20px',
                color: '#64748b',
                lineHeight: '1.6',
                marginBottom: '40px'
              }}>
                Every practice costs <strong style={{ color: '#0f172a' }}>$237K-367K</strong> in hidden coordination waste.
                <br />
                OnboardHealth automates 70%, saving{' '}
                <strong style={{ color: '#10b981' }}>$180K+ per location</strong>.
              </p>

              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <a href="#pricing" style={{
                  padding: '16px 36px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                  transition: 'all 0.2s'
                }}>
                  See Pricing
                  <ArrowRight size={18} />
                </a>

                <Link to="/dashboard" style={{
                  padding: '16px 36px',
                  background: 'white',
                  color: '#0f172a',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}>
                  <PlayCircle size={18} />
                  View Live Demo
                </Link>
              </div>

              <div style={{
                fontSize: '14px',
                color: '#94a3b8',
                fontWeight: '500'
              }}>
                Trusted by MSOs managing 200+ practices nationwide
              </div>
            </div>
          </div>

          {/* BOTTOM: Cost Breakdown - Clean 3 Cards */}
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '32px'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '8px'
              }}>
                Where Your $300K Goes
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#0f172a'
              }}>
                The Hidden Coordination Tax
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              maxWidth: '1000px',
              margin: '0 auto 32px'
            }}>
              {[
                { icon: Users, label: 'Implementation Team', cost: '$147K', desc: '800+ hours coordinating vendors, updating spreadsheets', color: '#dc2626' },
                { icon: Building2, label: 'Vendor Integration', cost: '$115K', desc: 'Credentialing, EHR, billing, compliance setup', color: '#dc2626' },
                { icon: Clock, label: 'Revenue Delays', cost: '$55K', desc: '30-60 day credentialing bottlenecks = lost revenue', color: '#dc2626' }
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '28px',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#fef2f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <item.icon size={24} color={item.color} />
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    color: item.color,
                    marginBottom: '8px'
                  }}>
                    {item.cost}
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '8px'
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.5'
                  }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Callout */}
            <div style={{
              maxWidth: '700px',
              margin: '0 auto',
              padding: '24px 40px',
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              borderRadius: '16px',
              border: '1px solid #fecaca',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#991b1b',
                  marginBottom: '4px'
                }}>
                  Total Waste Per Implementation
                </div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#dc2626'
                }}>
                  $317K
                </div>
              </div>
              <div style={{
                textAlign: 'right'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#166534',
                  marginBottom: '4px'
                }}>
                  OnboardHealth Saves
                </div>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '800',
                  color: '#10b981'
                }}>
                  $180K+
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#166534'
                }}>
                  70% automation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* THE COORDINATION TAX - HEADLINE 3 */}
      <section id="proof" style={{
        padding: '100px 40px',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '64px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: '#fef2f2',
              borderRadius: '999px',
              marginBottom: '24px',
              border: '1px solid #fee2e2'
            }}>
              <AlertCircle size={16} color="#dc2626" />
              <span style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#991b1b'
              }}>
                The Hidden Coordination Tax
              </span>
            </div>

            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              Stop Spending 800+ Hours Per Implementation
              <br />
              Chasing Vendors and Firefighting Delays
            </h2>

            <p style={{
              fontSize: '20px',
              color: '#64748b',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Ask any MSO operator: Onboarding a new practice is a 90-120 day nightmare. 
              Here's the invisible labor your team is doing right now:
            </p>
          </div>

          {/* Pain Points Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
            marginBottom: '64px'
          }}>
            {[
              {
                icon: Users,
                title: 'Endless Vendor Calls',
                hours: '120+ hours',
                description: 'Credentialing, EHR, billing, compliance - 6+ different vendors, all using different systems',
                cost: '$18K in PM time alone'
              },
              {
                icon: BarChart3,
                title: 'Spreadsheet Chaos',
                hours: '160+ hours',
                description: 'Ops, billing, compliance, IT all using different tools. Version control nightmares.',
                cost: '$16K in coordination overhead'
              },
              {
                icon: Clock,
                title: 'Revenue Delays',
                hours: '30-60 days',
                description: 'Credentialing bottlenecks mean practices can\'t bill. $200K/month practice = $50K+ lost.',
                cost: '$50K opportunity cost'
              },
              {
                icon: AlertCircle,
                title: 'Compliance Firefighting',
                hours: '80+ hours',
                description: 'State-specific requirements missed in the chaos. Discovered at go-live. Delays launch.',
                cost: '$20K in remediation'
              }
            ].map((pain, i) => (
              <div key={i} style={{
                padding: '32px',
                background: '#f8fafc',
                borderRadius: '16px',
                border: '2px solid #e2e8f0',
                transition: 'all 0.3s'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: '#fee2e2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <pain.icon size={28} color="#dc2626" />
                </div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '8px'
                }}>
                  {pain.title}
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#dc2626',
                  marginBottom: '12px'
                }}>
                  {pain.hours}
                </div>
                <div style={{
                  fontSize: '15px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  marginBottom: '16px'
                }}>
                  {pain.description}
                </div>
                <div style={{
                  padding: '12px 16px',
                  background: '#fef2f2',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#991b1b'
                }}>
                  Cost: {pain.cost}
                </div>
              </div>
            ))}
          </div>

          {/* Solution Callout */}
          <div style={{
            padding: '48px',
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            borderRadius: '20px',
            border: '2px solid #93c5fd',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '16px'
            }}>
              OnboardHealth Replaces All of This
            </div>
            <div style={{
              fontSize: '18px',
              color: '#475569',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '0 auto 32px'
            }}>
              The spreadsheets. The status meetings. The vendor chase calls. The firefighting.
              <br />
              All replaced with AI-powered automation.
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '48px'
            }}>
              <div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#2563eb'
                }}>
                  70%
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b'
                }}>
                  Less Coordination
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#10b981'
                }}>
                  $180K+
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b'
                }}>
                  Saved Per Location
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#8b5cf6'
                }}>
                  60 Days
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b'
                }}>
                  vs 120 Days
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PROOF SECTION */}
      <section style={{
        padding: '100px 40px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '64px'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '20px'
            }}>
              See the Platform in Action
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#64748b',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Real dashboards. Real AI predictions. Real $80K saves.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: '48px'
          }}>
            {/* Screenshot 1: Corporate Dashboard */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
              border: '2px solid #e2e8f0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BarChart3 size={24} color="white" />
                </div>
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#0f172a'
                  }}>
                    Corporate Dashboard
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    See all practices, AI predictions, and blockers at once
                  </div>
                </div>
              </div>

              <img 
                src="/landing-page/corporate-dashboard.png"
                alt="OnboardHealth Corporate Dashboard - EHR Modernization 2024 campaign showing 6 active practices, 45% average progress, 4 active blockers, and 6 AI-identified at-risk practices"
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}
              />
              <div style={{
                marginTop: '16px',
                padding: '16px',
                background: '#f0fdf4',
                borderRadius: '8px',
                border: '1px solid #86efac',
                textAlign: 'left'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#166534',
                  marginBottom: '8px'
                }}>
                  ✓ What you're seeing:
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#166534',
                  lineHeight: '1.6'
                }}>
                  6 practices across 3 cohorts • 45% average progress • 4 active blockers flagged • 6 practices AI-identified as at-risk • Real-time cohort performance tracking
                </div>
              </div>
            </div>

            {/* Screenshot 2: Practice AI Alert */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
              border: '2px solid #e2e8f0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AlertCircle size={24} color="white" />
                </div>
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#0f172a'
                  }}>
                    AI Delay Prediction Alert
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    See how AI caught the $80K problem 3 weeks early
                  </div>
                </div>
              </div>

              <img 
                src="/landing-page/practice-ai-alert.png"
                alt="Valley Medical Center practice view showing AI Delay Prediction: Critical Risk with detailed risk factors and recommendations"
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}
              />
              <div style={{
                marginTop: '16px',
                padding: '16px',
                background: '#fef2f2',
                borderRadius: '8px',
                border: '1px solid #fecaca',
                textAlign: 'left'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#991b1b',
                  marginBottom: '8px'
                }}>
                  ⚠️ AI caught this BEFORE the team noticed:
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#7f1d1d',
                  lineHeight: '1.6'
                }}>
                  Valley Medical Center at 72% complete with -626 days to deadline • 1 blocked task causing cascading delays • Progress 25% behind expected • AI recommends adding resources or adjusting timeline
                </div>
              </div>
            </div>

            {/* Screenshot 3: Practice Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
              border: '2px solid #e2e8f0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AlertCircle size={24} color="white" />
                </div>
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#0f172a'
                  }}>
                    At-a-Glance Risk Detection
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    See AI risk alerts on every practice in your list view
                  </div>
                </div>
              </div>

              <img 
                src="/landing-page/practice-card.png"
                alt="Metro Primary Care practice card showing AI: Critical Risk status with 2 active blockers and 45% completion"
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}
              />
              <div style={{
                marginTop: '16px',
                padding: '16px',
                background: '#fff7ed',
                borderRadius: '8px',
                border: '1px solid #fed7aa',
                textAlign: 'left'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#9a3412',
                  marginBottom: '8px'
                }}>
                  ⚡ At-a-glance risk detection:
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#7c2d12',
                  lineHeight: '1.6'
                }}>
                  Metro Primary Care (Houston, TX) flagged with AI: Critical Risk • 2 blockers requiring immediate attention • 45% tasks completed • Cohort B performance tracking
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 CORE FEATURES SECTION */}
      <section id="features" style={{
        padding: '100px 40px',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '64px'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '20px'
            }}>
              Everything Your MSO Needs
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#64748b',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              9 core features for complete implementation management
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            marginBottom: '80px'
          }}>
            {[
              { icon: MapPin, title: 'Multi-Location Rollouts', desc: 'Cohort-based phased implementations' },
              { icon: Shield, title: 'State Compliance', desc: 'CA/TX/NY requirements tracking' },
              { icon: UserCheck, title: 'Stakeholder Assignment', desc: 'Role-based task allocation' },
              { icon: Bell, title: 'Auto-Escalation', desc: 'Automatic blocker notifications' },
              { icon: Network, title: 'Vendor Coordination', desc: 'SLA tracking & portal access' },
              { icon: Activity, title: 'Health Monitoring', desc: 'Post-launch metrics' },
              { icon: BookOpen, title: 'Playbook Library', desc: 'Reusable templates' },
              { icon: LineChart, title: 'Resource Tracking', desc: 'Support time monitoring' },
              { icon: MessageSquare, title: 'Communication Hub', desc: 'Threaded announcements' }
            ].map((feature, i) => (
              <div key={i} style={{
                padding: '32px',
                background: '#f8fafc',
                borderRadius: '16px',
                border: '2px solid #e2e8f0',
                transition: 'all 0.3s'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <feature.icon size={28} color="#2563eb" />
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '8px'
                }}>
                  {feature.title}
                </div>
                <div style={{
                  fontSize: '15px',
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  {feature.desc}
                </div>
              </div>
            ))}
          </div>

          {/* 5 AI FEATURES */}
          <div style={{
            textAlign: 'center',
            marginBottom: '48px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: '999px',
              marginBottom: '24px',
              border: '1px solid #93c5fd'
            }}>
              <Brain size={16} color="#1e40af" />
              <span style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#1e3a8a'
              }}>
                5 AI Features
              </span>
            </div>
            <h3 style={{
              fontSize: '40px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '16px'
            }}>
              AI That Eliminates $180K of Waste
            </h3>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Not gimmicks. Real AI that automates the coordination work your team is doing manually.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: '32px'
          }}>
            {[
              {
                icon: Brain,
                color: '#2563eb',
                title: 'AI Delay Prediction',
                subtitle: 'Predicts delays 2-3 weeks early',
                savings: 'Prevents $50K-100K in delay costs',
                replaces: '40 hours of manual status meetings + firefighting',
                features: [
                  'Analyzes 47 tasks, dependencies, progress',
                  'High/medium/low confidence scores',
                  'Specific risk factors and recommendations',
                  'Predicted cost impact of delays'
                ]
              },
              {
                icon: Zap,
                color: '#8b5cf6',
                title: 'Smart Task Generator',
                subtitle: '25-35 tasks in 30 seconds',
                savings: 'Saves 2 hours per playbook ($300/each)',
                replaces: 'Manual playbook building',
                features: [
                  'Expert-designed task sequences',
                  'Automatic dependency mapping',
                  'State-specific compliance included',
                  'Role assignments pre-configured'
                ]
              },
              {
                icon: Bot,
                color: '#10b981',
                title: '24/7 AI Practice Assistant',
                subtitle: 'Context-aware answers, instant',
                savings: 'Reduces support tickets 60%',
                replaces: '3 hours/week of support calls = $15K/year',
                features: [
                  'Knows their tasks, blockers, deadlines',
                  'State-specific compliance answers',
                  'Links to templates and resources',
                  'Available 24/7 for all practices'
                ]
              },
              {
                icon: Target,
                color: '#f97316',
                title: 'Smart Escalation Intelligence',
                subtitle: 'Auto-routes critical issues',
                savings: 'Prevents 15-day delays from missed blockers',
                replaces: 'Manual triage + exec time on non-critical issues',
                features: [
                  'CRITICAL/HIGH/MEDIUM urgency levels',
                  'Routes to right stakeholders (exec, ops, vendor)',
                  'Predicts impact if unresolved',
                  'SLA breach detection'
                ]
              },
              {
                icon: Shield,
                color: '#dc2626',
                title: 'Compliance Document Analyzer',
                subtitle: 'State-specific validation (CA/TX/NY)',
                savings: 'Prevents $20K in remediation costs',
                replaces: 'Compliance officer review time',
                features: [
                  'Verifies CA CPOM, TX DEA, NY privileges',
                  'Catches missing docs before go-live',
                  'Checks file completeness',
                  'Flags expiration dates'
                ]
              }
            ].map((feature, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '2px solid #e2e8f0',
                transition: 'all 0.3s'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '32px',
                  alignItems: 'start'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: `${feature.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <feature.icon size={32} color={feature.color} />
                  </div>

                  <div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#0f172a',
                      marginBottom: '8px'
                    }}>
                      {feature.title}
                    </div>
                    <div style={{
                      fontSize: '16px',
                      color: '#64748b',
                      marginBottom: '16px'
                    }}>
                      {feature.subtitle}
                    </div>
                    <div style={{
                      display: 'grid',
                      gap: '8px',
                      marginBottom: '20px'
                    }}>
                      {feature.features.map((item, j) => (
                        <div key={j} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '15px',
                          color: '#475569'
                        }}>
                          <CheckCircle2 size={18} color={feature.color} strokeWidth={2.5} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    minWidth: '200px',
                    textAlign: 'right'
                  }}>
                    <div style={{
                      padding: '16px',
                      background: '#f0fdf4',
                      borderRadius: '12px',
                      border: '2px solid #86efac',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#166534',
                        marginBottom: '4px'
                      }}>
                        SAVES
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#15803d',
                        lineHeight: '1.3'
                      }}>
                        {feature.savings}
                      </div>
                    </div>
                    <div style={{
                      padding: '16px',
                      background: '#fef2f2',
                      borderRadius: '12px',
                      border: '2px solid #fecaca'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#991b1b',
                        marginBottom: '4px'
                      }}>
                        REPLACES
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#7f1d1d',
                        lineHeight: '1.3'
                      }}>
                        {feature.replaces}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" style={{
        padding: '100px 40px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '64px'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '20px'
            }}>
              Transparent Pricing
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#64748b',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              One platform. Three ways to start. All plans include full AI capabilities.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {/* Founding MSO Partner - LIMITED */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              border: '3px solid #14b8a6',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(20, 184, 166, 0.15)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '6px 16px',
                background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '700',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap'
              }}>
                🌟 Limited to 5 MSOs
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#14b8a6',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Founding Partner
              </div>
              <div style={{
                fontSize: '40px',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '4px'
              }}>
                $15K
              </div>
              <div style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '20px'
              }}>
                6 months • First 5 only
              </div>
              <div style={{
                marginBottom: '24px'
              }}>
                {['Full platform access', 'Priority support', 'Shape roadmap', 'Forever 25% discount', 'Case study feature', 'First access to features'].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '10px 0',
                    borderBottom: i < 5 ? '1px solid #f1f5f9' : 'none',
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: '1.4'
                  }}>
                    <Check size={16} color="#14b8a6" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a href="mailto:bianca@diamondelement.com?subject=Founding MSO Partner Application" style={{
                display: 'block',
                padding: '12px',
                background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                color: 'white',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
                transition: 'all 0.2s'
              }}>
                Apply Now
              </a>
              <div style={{
                marginTop: '12px',
                textAlign: 'center',
                fontSize: '11px',
                color: '#dc2626',
                fontWeight: '600'
              }}>
                ⏰ Expires Mar 31 • 3 spots left
              </div>
            </div>

            {/* Pilot */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              border: '2px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#64748b',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Pilot
              </div>
              <div style={{
                fontSize: '40px',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '4px'
              }}>
                $5K
              </div>
              <div style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '20px'
              }}>
                One-time • 1-2 practices
              </div>
              <div style={{
                marginBottom: '24px'
              }}>
                {['Single cohort', 'Full AI features', 'Dashboard access', 'Basic support'].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '10px 0',
                    borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none',
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: '1.4'
                  }}>
                    <Check size={16} color="#10b981" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a href="mailto:bianca@diamondelement.com?subject=OnboardHealth Pilot" style={{
                display: 'block',
                padding: '12px',
                background: 'white',
                color: '#2563eb',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}>
                Start Pilot
              </a>
            </div>

            {/* Professional - RECOMMENDED */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              border: '3px solid #2563eb',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(37, 99, 235, 0.15)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '6px 20px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '700',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Recommended
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#2563eb',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Professional
              </div>
              <div style={{
                fontSize: '40px',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '4px'
              }}>
                $60K
              </div>
              <div style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '20px'
              }}>
                Annual • Up to 15 practices
              </div>
              <div style={{
                marginBottom: '24px'
              }}>
                {['Everything in Pilot', 'Multi-cohort rollouts', 'Unlimited campaigns', 'AI task generation', 'Priority support', 'Custom playbooks'].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '10px 0',
                    borderBottom: i < 5 ? '1px solid #f1f5f9' : 'none',
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: '1.4'
                  }}>
                    <Check size={16} color="#2563eb" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a href="mailto:bianca@diamondelement.com?subject=OnboardHealth Professional Plan" style={{
                display: 'block',
                padding: '12px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                color: 'white',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.2s'
              }}>
                Get Started
              </a>
            </div>

            {/* Enterprise */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              border: '2px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#64748b',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Enterprise
              </div>
              <div style={{
                fontSize: '40px',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '4px'
              }}>
                Custom
              </div>
              <div style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '20px'
              }}>
                Annual • 15+ practices
              </div>
              <div style={{
                marginBottom: '24px'
              }}>
                {['Everything in Professional', 'White-label options', 'Custom integrations', 'Dedicated manager', 'SLA guarantees', 'Custom training'].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '10px 0',
                    borderBottom: i < 5 ? '1px solid #f1f5f9' : 'none',
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: '1.4'
                  }}>
                    <Check size={16} color="#10b981" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a href="mailto:bianca@diamondelement.com?subject=OnboardHealth Enterprise Inquiry" style={{
                display: 'block',
                padding: '12px',
                background: 'white',
                color: '#2563eb',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}>
                Contact Sales
              </a>
            </div>
          </div>

          {/* Founding Partner Program Details */}
          <div style={{
            padding: '40px',
            background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
            borderRadius: '20px',
            border: '2px solid #5eead4',
            marginBottom: '48px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '24px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Users size={32} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  color: '#0f172a',
                  marginBottom: '12px'
                }}>
                  🌟 Founding MSO Partner Program
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#475569',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  Be one of the first 5 MSOs to shape the future of implementation management. 
                  Get full platform access at 75% off for 6 months, plus lifetime benefits.
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px'
                }}>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#115e59',
                      marginBottom: '12px'
                    }}>
                      What You Get:
                    </div>
                    {[
                      'Full platform access (all 9 core + 5 AI features)',
                      'Priority support & bi-weekly feedback calls',
                      'Direct input on roadmap & feature prioritization',
                      'Forever 25% discount after beta ($45K/year vs $60K)',
                      'Featured as launch partner (logo + case study)',
                      'First access to all new features'
                    ].map((item, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: '#475569'
                      }}>
                        <CheckCircle2 size={16} color="#14b8a6" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#115e59',
                      marginBottom: '12px'
                    }}>
                      Requirements:
                    </div>
                    {[
                      'Active MSO managing 3+ practices',
                      'Bi-weekly 30-min feedback sessions',
                      'Willing to participate in case study',
                      'Commit to full 6-month partnership'
                    ].map((item, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: '#475569'
                      }}>
                        <Check size={16} color="#14b8a6" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                    <div style={{
                      marginTop: '20px',
                      padding: '16px',
                      background: 'white',
                      borderRadius: '12px',
                      border: '2px solid #14b8a6'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#0d9488',
                        marginBottom: '4px'
                      }}>
                        Your Investment:
                      </div>
                      <div style={{
                        fontSize: '32px',
                        fontWeight: '800',
                        color: '#14b8a6',
                        marginBottom: '4px'
                      }}>
                        $15,000
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#64748b'
                      }}>
                        6 months • Then $45K/year (25% off forever)
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{
                  marginTop: '24px',
                  padding: '16px',
                  background: '#fef2f2',
                  borderRadius: '12px',
                  border: '1px solid #fecaca',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Clock size={20} color="#dc2626" />
                  <div>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#991b1b'
                    }}>
                      Limited Time:
                    </span>
                    <span style={{
                      fontSize: '14px',
                      color: '#7f1d1d',
                      marginLeft: '8px'
                    }}>
                      Program expires March 31, 2026 • Only 3 spots remaining
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Comparison */}
          <div style={{
            padding: '40px',
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            borderRadius: '20px',
            border: '2px solid #93c5fd',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '16px'
            }}>
              vs Monday.com: 75% Less Expensive
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '64px',
              marginBottom: '16px'
            }}>
              <div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  marginBottom: '4px'
                }}>
                  Monday.com (15 practices)
                </div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#dc2626',
                  textDecoration: 'line-through'
                }}>
                  $240K/year
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  marginBottom: '4px'
                }}>
                  OnboardHealth (15 practices)
                </div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#10b981'
                }}>
                  $60K/year
                </div>
              </div>
            </div>
            <div style={{
              fontSize: '16px',
              color: '#475569'
            }}>
              Plus healthcare-specific AI they don't have
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION - HEADLINE 2 */}
      <section id="roi" style={{
        padding: '100px 40px',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '64px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: '999px',
              marginBottom: '24px',
              border: '1px solid #93c5fd'
            }}>
              <Calculator size={16} color="#1e40af" />
              <span style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#1e3a8a'
              }}>
                Calculate Your ROI
              </span>
            </div>

            <h2 style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              MSOs Waste $237K-367K Per Practice Implementation.
              <br />
              Here's How We Cut That by 70%.
            </h2>

            <p style={{
              fontSize: '20px',
              color: '#64748b',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Not theoretical. Not estimated. Actual line-item savings from automating coordination work.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            borderRadius: '24px',
            padding: '48px',
            border: '2px solid #93c5fd'
          }}>
            <div style={{
              marginBottom: '40px'
            }}>
              <label style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#0f172a',
                display: 'block',
                marginBottom: '16px'
              }}>
                How many practice implementations per year?
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={calculatorInputs.implementationsPerYear}
                onChange={(e) => setCalculatorInputs({ implementationsPerYear: parseInt(e.target.value) })}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: '#cbd5e1',
                  outline: 'none',
                  marginBottom: '12px'
                }}
              />
              <div style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#2563eb',
                textAlign: 'center'
              }}>
                {calculatorInputs.implementationsPerYear} implementations
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '32px',
              marginBottom: '40px'
            }}>
              <div style={{
                background: 'white',
                padding: '32px',
                borderRadius: '16px',
                border: '2px solid #fee2e2'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#991b1b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '16px'
                }}>
                  CURRENT ANNUAL COSTS
                </div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#dc2626',
                  marginBottom: '8px'
                }}>
                  ${(roi.annualCost / 1000).toFixed(0)}K
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  {calculatorInputs.implementationsPerYear} implementations × $302K average
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '32px',
                borderRadius: '16px',
                border: '2px solid #d1fae5'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#166534',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '16px'
                }}>
                  WITH ONBOARDHEALTH (70% AUTOMATION)
                </div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#10b981',
                  marginBottom: '8px'
                }}>
                  ${(roi.withOnboardHealth / 1000).toFixed(0)}K
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  ${(roi.annualCost / 1000).toFixed(0)}K × 0.30 (only 30% manual work)
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              padding: '40px',
              borderRadius: '16px',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '16px',
                opacity: 0.95
              }}>
                Your Annual Savings
              </div>
              <div style={{
                fontSize: '72px',
                fontWeight: '800',
                marginBottom: '24px',
                lineHeight: '1'
              }}>
                ${(roi.savings / 1000000).toFixed(2)}M
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px',
                marginTop: '32px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    marginBottom: '4px'
                  }}>
                    ${roi.investment / 1000}K
                  </div>
                  <div style={{
                    fontSize: '14px',
                    opacity: 0.9
                  }}>
                    Annual Investment
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    marginBottom: '4px'
                  }}>
                    {roi.roi}x
                  </div>
                  <div style={{
                    fontSize: '14px',
                    opacity: 0.9
                  }}>
                    Return on Investment
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    marginBottom: '4px'
                  }}>
                    {roi.paybackDays} days
                  </div>
                  <div style={{
                    fontSize: '14px',
                    opacity: 0.9
                  }}>
                    Payback Period
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              marginTop: '40px'
            }}>
              <a href="mailto:bianca@diamondelement.com?subject=OnboardHealth ROI Discussion" style={{
                padding: '18px 40px',
                background: 'white',
                color: '#2563eb',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
                Book Demo to Validate These Numbers
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '100px 40px',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '56px',
            fontWeight: '800',
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            Ready to Stop Wasting $300K Per Implementation?
          </h2>

          <p style={{
            fontSize: '20px',
            color: '#cbd5e1',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            See exactly how much your MSO could save. No fluff, just real ROI.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center'
          }}>
            <a href="mailto:bianca@diamondelement.com?subject=OnboardHealth Demo Request" style={{
              padding: '18px 40px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
              color: 'white',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)'
            }}>
              Book Your Demo
              <ArrowRight size={20} />
            </a>
          </div>

          <div style={{
            marginTop: '48px',
            fontSize: '14px',
            color: '#94a3b8'
          }}>
            Join MSOs managing 200+ practices who've cut implementation costs by 70%
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 40px',
        background: '#0f172a',
        color: '#94a3b8',
        borderTop: '1px solid #1e293b'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={18} color="white" strokeWidth={3} />
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'white'
            }}>OnboardHealth</div>
          </div>

          <div>© 2025 Diamond Element Consulting. Built for MSO operators who deserve better.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageFinal;
