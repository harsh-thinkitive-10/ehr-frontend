import type { ReactNode } from 'react';

import {
  Box,
  Stack,
  Typography,
} from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import InsightsIcon from '@mui/icons-material/Insights';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import doctorImage from '../../assets/ehr-login-doctor.png';

interface AuthLayoutProps {
  children: ReactNode;
}

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}


const features: Feature[] = [
  {
    icon: <PeopleIcon />,
    title: 'Complete Patient History',
    description: 'All records in one place',
  },
  {
    icon: <SecurityIcon />,
    title: 'Secure & Compliant',
    description: 'Your data, always protected',
  },
  {
    icon: <InsightsIcon />,
    title: 'Better Clinical Decisions',
    description: 'Insights for improved outcomes',
  },
  {
    icon: <FavoriteIcon />,
    title: 'Focused on What Matters',
    description: 'Patients first',
  },
];

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        bgcolor: '#fff',
      }}
    >
      {/* LEFT SIDE */}

      <Box
        sx={{
          position: 'relative',
          width: '50%',
          height: '100%',
          overflow: 'hidden',
          display: {
            xs: 'none',
            md: 'block',
          },
          bgcolor: '#16344d',
        }}
      >
        {/* Doctor Image */}

        <Box
          component="img"
          src={doctorImage}
          alt="Healthcare professional"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Dark overlay */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(10,35,55,0.92) 0%, rgba(10,35,55,0.70) 45%, rgba(10,35,55,0.25) 100%)',
          }}
        />

        {/* Content */}

        <Stack
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            p: {
              md: 5,
              lg: 7,
            },
            color: '#fff',
          }}
        >
          {/* Logo */}

          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor:
                  'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box
                component="img"
                src="/logo.png" // Replace with your actual image path or URL
                alt="Company Logo"
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: 'contain'
                }}
              />

            </Box>

            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1,
                  color: 'rgba(255,255,255,0.78)',
                }}
              >
                CarePlus
                <Box
                  component="span"
                  sx={{
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  {' '}
                  EHR
                </Box>
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  opacity: 0.75,
                  letterSpacing: 1,
                }}
              >
                PEOPLE &nbsp; | &nbsp; RECORDS &nbsp; | &nbsp;
                BETTER CARE
              </Typography>
            </Box>
          </Stack>

          {/* Quote */}

          <Box
            sx={{
              mt: 'auto',
              maxWidth: 420,
            }}
          >
            <Typography
              sx={{
                fontStyle: 'italic',
                color:
                  'rgba(255,255,255,0.7)',
                fontSize: '0.95rem',
              }}
            >
              "Technology that cares, for a healthier
              tomorrow."
            </Typography>
          </Box>
          {/* Hero */}

          <Box
            sx={{
              mt: {
                md: 8,
                lg: 5,
              },
              maxWidth: 560,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: {
                  md: '2.5rem',
                  lg: '3.5rem',
                },
                lineHeight: 1.15,
                mb: 3,
              }}
            >
              Smarter Records.
              <br />
              Healthier Tomorrows.
            </Typography>

            <Typography
              sx={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                maxWidth: 500,
                color:
                  'rgba(255,255,255,0.78)',
              }}
            >
              A modern Electronic Health Record
              system that helps healthcare providers
              deliver safer, faster, and more
              personalized care.
            </Typography>
          </Box>

          {/* Features */}

          <Stack
            spacing={2.5}
            sx={{
              mt: 6,
              maxWidth: 500,
            }}
          >
            {features.map((feature) => (
              <Stack
                key={feature.title}
                direction="row"
                spacing={2}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    minWidth: 48,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor:
                      'rgba(255,255,255,0.13)',
                    backdropFilter: 'blur(8px)',

                    '& svg': {
                      fontSize: 23,
                    },
                  }}
                >
                  {feature.icon}
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        'rgba(255,255,255,0.65)',
                      mt: 0.3,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>

      {/* RIGHT SIDE */}

      <Box
        sx={{
          width: {
            xs: '100%',
            md: '50%',
          },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#fff',
        }}
      >
        {/* Top navigation */}

        <Stack
          direction="row"
          spacing={1}
          sx={{
            px: {
              xs: 3,
              md: 5,
            },
            py: 4,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            New here?
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: '#1769d1',
              cursor: 'pointer',
            }}
          >
            Contact Admin
          </Typography>
        </Stack>

        {/* Login content */}

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: {
              xs: 3,
              sm: 5,
              md: 8,
              lg: 12,
            },
            pb: 8,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 500,
            }}
          >
            {children}

            {/* Security message */}

            <Stack
              direction="row"
              spacing={1}
              sx={{
                mt: 6,
                justifyContent: 'center',
              }}
            >
              <VerifiedUserIcon
                sx={{
                  fontSize: 18,
                  color: '#169b83',
                }}
              />

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Secure • HIPAA Compliant • Trusted by
                Healthcare Professionals
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}