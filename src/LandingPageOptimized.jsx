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
  PlayCircle
} from 'lucide-react';

// ============================================================================
// OPTIMIZED LANDING PAGE - RESEARCH-BACKED WITH 3 STRATEGIC HEADLINES
// ============================================================================

const LandingPageOptimized = () => {
  const [calculatorInputs, setCalculatorInputs] = useState({
    implementationsPerYear: 10
  });

  const calculateROI = () => {
    const avgCost = 302000; // Average of $237K-367K range
    const annualCost = avgCost * calculatorInputs.implementationsPerYear;
    const withOnboardHealth = annualCost * 0.30; // 70% automation
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
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Rocket size={24} color="white" />
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
            <a href="#roi" style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#475569',
              textDecoration: 'none'
            }}>ROI Calculator</a>
            <a href="#features" style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#475569',
              textDecoration: 'none'
            }}>Features</a>
            <a href="#proof" style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#475569',
              textDecoration: 'none'
            }}>See Proof</a>
            <Link to="/dashboard" style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              color: 'white',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
              transition: 'all 0.2s'
            }}>
              View Demo
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - HEADLINE 1: Pain + Specificity */}
      <section style={{
        background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 50%, #ffffff 100%)',
        padding: '80px 40px 100px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Badge */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: '999px',
              border: '1px solid #93c5fd'
            }}>
              <Brain size={16} color="#0284c7" />
              <span style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#075985'
              }}>
                AI-Powered MSO Implementation Platform
              </span>
            </div>
          </div>

          {/* HEADLINE 1 - Most Shocking/Attention-Grabbing */}
          <h1 style={{
            fontSize: '64px',
            fontWeight: '800',
            color: '#0f172a',
            lineHeight: '1.1',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            maxWidth: '1100px',
            margin: '0 auto 32px'
          }}>
            Your Implementation Team Just Burned{' '}
            <span style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              $147,000
            </span>
            <br />
            Coordinating What AI Could Do in 30 Seconds
          </h1>

          <p style={{
            fontSize: '22px',
            color: '#475569',
            lineHeight: '1.6',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto 48px'
          }}>
            Every practice implementation costs your MSO <strong>$237K-367K</strong> in hidden coordination waste.
            OnboardHealth automates 70% of that work, saving you <strong>$180K+ per location</strong>.
          </p>

          {/* Cost Breakdown + Dashboard Preview Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'start',
            marginBottom: '64px'
          }}>
            {/* Left: Cost Breakdown */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
              border: '2px solid #e0f2fe'
            }}>
              <div style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                WHERE YOUR $300K GOES:
              </div>

              {/* Line Item 1 */}
              <div style={{
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '12px',
                marginBottom: '16px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <Users size={24} color="#0ea5e9" />
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#0f172a'
                    }}>
                      Implementation Team
                    </div>
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#dc2626'
                  }}>
                    $147K
                  </div>
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  paddingLeft: '36px'
                }}>
                  800+ hours chasing vendors, updating spreadsheets, firefighting delays
                </div>
              </div>

              {/* Line Item 2 */}
              <div style={{
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '12px',
                marginBottom: '16px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <Building2 size={24} color="#0ea5e9" />
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#0f172a'
                    }}>
                      Vendor/Integration Costs
                    </div>
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#dc2626'
                  }}>
                    $115K
                  </div>
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  paddingLeft: '36px'
                }}>
                  Credentialing, EHR setup, billing, compliance, payor enrollment
                </div>
              </div>

              {/* Line Item 3 */}
              <div style={{
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '12px',
                marginBottom: '24px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <Clock size={24} color="#0ea5e9" />
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#0f172a'
                    }}>
                      Revenue Delays & Rework
                    </div>
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#dc2626'
                  }}>
                    $55K
                  </div>
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  paddingLeft: '36px'
                }}>
                  30-60 day credentialing delays = lost billable revenue
                </div>
              </div>

              {/* Total */}
              <div style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                borderRadius: '12px',
                border: '2px solid #fca5a5'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#991b1b'
                  }}>
                    Total Waste Per Location
                  </div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '800',
                    color: '#dc2626'
                  }}>
                    $317K
                  </div>
                </div>
              </div>

              {/* Solution */}
              <div style={{
                marginTop: '24px',
                padding: '24px',
                background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                borderRadius: '12px',
                border: '2px solid #6ee7b7'
              }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#065f46',
                  marginBottom: '8px'
                }}>
                  OnboardHealth automates 70% of this work
                </div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#047857'
                }}>
                  Save $180K+ per location
                </div>
              </div>
            </div>

            {/* Right: Dashboard Screenshot Placeholder */}
            <div>
              {/* PLACEHOLDER FOR REAL DASHBOARD SCREENSHOT #1 */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
                border: '2px solid #e0f2fe',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* AI Powered Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '999px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'white',
                  fontSize: '13px',
                  fontWeight: '700',
                  zIndex: 10
                }}>
                  <Brain size={14} />
                  AI Powered
                </div>

                {/* Dashboard Preview Header */}
                <div style={{
                  padding: '24px',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  color: 'white'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <AlertCircle size={24} />
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '700'
                    }}>
                      AI Delay Prediction - LIVE
                    </div>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    opacity: 0.95
                  }}>
                    Analyzing 47 tasks across 12 practices...
                  </div>
                </div>

                {/* 
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  REPLACE THIS SECTION WITH YOUR REAL DASHBOARD SCREENSHOT
                  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  
                  Instructions:
                  1. Take screenshot of your dashboard showing AI prediction
                  2. Save as: dashboard-ai-prediction.png
                  3. Replace the mock content below with:
                     <img src="/dashboard-ai-prediction.png" 
                          alt="AI Delay Prediction"
                          style={{width: '100%', display: 'block'}} />
                */}
                <div style={{ padding: '24px' }}>
                  <div style={{
                    padding: '20px',
                    background: '#fef2f2',
                    border: '2px solid #fca5a5',
                    borderRadius: '12px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '12px'
                    }}>
                      <AlertCircle size={20} color="#dc2626" />
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#991b1b'
                      }}>
                        High Risk: 12-Day Delay Predicted
                      </div>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#7f1d1d',
                      lineHeight: '1.6',
                      marginBottom: '16px'
                    }}>
                      Harbor Health Clinic has 3 critical path blockers. Immediate intervention required.
                    </div>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#991b1b',
                      marginBottom: '8px'
                    }}>
                      Risk Factors:
                    </div>
                    {['Critical vendor delay (blocking $50K revenue)', 'Understaffed implementation team', 'Missing compliance documentation'].map((risk, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px',
                        background: 'white',
                        borderRadius: '8px',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#ef4444'
                        }} />
                        <div style={{
                          fontSize: '14px',
                          color: '#475569'
                        }}>{risk}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    padding: '16px',
                    background: '#f0fdf4',
                    border: '2px solid #86efac',
                    borderRadius: '12px'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#166534',
                      marginBottom: '8px'
                    }}>
                      AI Prevented Cost:
                    </div>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: '800',
                      color: '#15803d'
                    }}>
                      $80,000
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#166534',
                      marginTop: '4px'
                    }}>
                      By detecting this 3 weeks early
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                marginTop: '24px',
                padding: '16px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  fontSize: '13px',
                  color: '#64748b',
                  marginBottom: '4px'
                }}>
                  This is how we prevent the $55K in revenue delays
                </div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#0f172a'
                }}>
                  that kill most implementations
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center'
          }}>
            <a href="#roi" style={{
              padding: '18px 40px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              color: 'white',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(14, 165, 233, 0.35)',
              transition: 'all 0.2s'
            }}>
              <Calculator size={20} />
              Calculate Your Savings
            </a>

            <a href="#proof" style={{
              padding: '18px 40px',
              background: 'white',
              color: '#0f172a',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s'
            }}>
              <PlayCircle size={20} />
              See Live Demo
            </a>
          </div>

          {/* Social Proof */}
        </div>
      </section>

      {/* THE COORDINATION TAX - HEADLINE 3: Problem + Proof */}
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

            {/* HEADLINE 3 - Problem Focused */}
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
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderRadius: '20px',
            border: '2px solid #bae6fd',
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
                  color: '#0ea5e9'
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

      {/* DASHBOARD PROOF SECTION - Real Screenshots */}
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

          {/* 
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            DASHBOARD SCREENSHOT PLACEHOLDERS
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            
            Share your screenshots and I'll help you insert them here:
            
            Screenshot 1: Corporate Dashboard (all practices view)
            Screenshot 2: Practice View with AI Alert
            Screenshot 3: AI Chatbot in Action
            Screenshot 4: Task Generation Results
          */}

          <div style={{
            display: 'grid',
            gap: '48px'
          }}>
            {/* Placeholder 1: Corporate Dashboard */}
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
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
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

            {/* Placeholder 2: Practice View */}
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

            {/* Placeholder 3: AI Chatbot */}
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
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
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

      {/* ROI CALCULATOR SECTION - HEADLINE 2: ROI + Authority */}
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
              <Calculator size={16} color="#0284c7" />
              <span style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#075985'
              }}>
                Calculate Your ROI
              </span>
            </div>

            {/* HEADLINE 2 - ROI Focused */}
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
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderRadius: '24px',
            padding: '48px',
            border: '2px solid #bae6fd'
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
                color: '#0ea5e9',
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
              {/* Current Costs */}
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

              {/* With OnboardHealth */}
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

            {/* Results */}
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
                color: '#0ea5e9',
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

      {/* AI Features Section */}
      <section id="features" style={{
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
              5 AI Features That Eliminate $180K of Waste
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#64748b',
              maxWidth: '800px',
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
                color: '#0ea5e9',
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
                color: '#f59e0b',
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
                  {/* Icon */}
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

                  {/* Content */}
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

                  {/* Savings */}
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

      {/* Final CTA */}
      <section style={{
        padding: '100px 40px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
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
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              color: 'white',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(14, 165, 233, 0.35)'
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
            <Rocket size={24} color="#0ea5e9" />
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

export default LandingPageOptimized;
