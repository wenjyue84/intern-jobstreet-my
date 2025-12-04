export default function CompanyLogo({ company, size = 40 }) {
    // Generate a consistent color scheme based on company name
    const getColorScheme = (name) => {
        const schemes = [
            {
                gradient: ['#0032A0', '#0EA5E9'],
                icon: 'building',
                iconColor: '#ffffff'
            },
            {
                gradient: ['#6B46C1', '#EC4899'],
                icon: 'briefcase',
                iconColor: '#ffffff'
            },
            {
                gradient: ['#059669', '#14B8A6'],
                icon: 'rocket',
                iconColor: '#ffffff'
            },
            {
                gradient: ['#F97316', '#FBBF24'],
                icon: 'lightbulb',
                iconColor: '#ffffff'
            },
            {
                gradient: ['#DC2626', '#FB7185'],
                icon: 'star',
                iconColor: '#ffffff'
            },
            {
                gradient: ['#4F46E5', '#A78BFA'],
                icon: 'network',
                iconColor: '#ffffff'
            },
            {
                gradient: ['#475569', '#64748B'],
                icon: 'shield',
                iconColor: '#ffffff'
            },
            {
                gradient: ['#14B8A6', '#22D3EE'],
                icon: 'globe',
                iconColor: '#ffffff'
            }
        ];

        // Use company name to consistently pick a color scheme
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return schemes[hash % schemes.length];
    };

    const getIcon = (iconType) => {
        const icons = {
            building: (
                <>
                    <rect x="8" y="6" width="8" height="18" fill="currentColor" opacity="0.9" />
                    <rect x="10" y="8" width="1.5" height="1.5" fill="white" opacity="0.7" />
                    <rect x="13" y="8" width="1.5" height="1.5" fill="white" opacity="0.7" />
                    <rect x="10" y="11" width="1.5" height="1.5" fill="white" opacity="0.7" />
                    <rect x="13" y="11" width="1.5" height="1.5" fill="white" opacity="0.7" />
                    <rect x="10" y="14" width="1.5" height="1.5" fill="white" opacity="0.7" />
                    <rect x="13" y="14" width="1.5" height="1.5" fill="white" opacity="0.7" />
                    <rect x="11" y="19" width="2.5" height="5" fill="white" opacity="0.9" />
                </>
            ),
            briefcase: (
                <>
                    <rect x="6" y="10" width="12" height="9" rx="1.5" fill="currentColor" opacity="0.9" />
                    <rect x="9" y="7" width="6" height="3" rx="1" fill="currentColor" opacity="0.7" />
                    <rect x="11" y="13" width="2" height="1.5" fill="white" opacity="0.8" />
                </>
            ),
            rocket: (
                <>
                    <path d="M12 3L8 12L12 10L16 12L12 3Z" fill="currentColor" opacity="0.9" />
                    <circle cx="12" cy="8" r="1.5" fill="white" opacity="0.8" />
                    <path d="M8 12L6 16L8 15L8 12Z" fill="currentColor" opacity="0.7" />
                    <path d="M16 12L18 16L16 15L16 12Z" fill="currentColor" opacity="0.7" />
                    <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
                </>
            ),
            lightbulb: (
                <>
                    <circle cx="12" cy="10" r="4" fill="currentColor" opacity="0.9" />
                    <rect x="10.5" y="14" width="3" height="4" rx="0.5" fill="currentColor" opacity="0.7" />
                    <rect x="10" y="18" width="4" height="1.5" rx="0.5" fill="currentColor" opacity="0.8" />
                    <line x1="12" y1="4" x2="12" y2="5" stroke="white" strokeWidth="1.5" opacity="0.7" />
                    <line x1="17" y1="7" x2="16" y2="8" stroke="white" strokeWidth="1.5" opacity="0.7" />
                    <line x1="7" y1="7" x2="8" y2="8" stroke="white" strokeWidth="1.5" opacity="0.7" />
                </>
            ),
            star: (
                <>
                    <path d="M12 5L13.5 9.5L18 10L14.5 13L15.5 17.5L12 15L8.5 17.5L9.5 13L6 10L10.5 9.5L12 5Z"
                        fill="currentColor" opacity="0.9" />
                    <circle cx="12" cy="11" r="1.5" fill="white" opacity="0.7" />
                </>
            ),
            network: (
                <>
                    <circle cx="12" cy="8" r="2.5" fill="currentColor" opacity="0.9" />
                    <circle cx="7" cy="16" r="2.5" fill="currentColor" opacity="0.9" />
                    <circle cx="17" cy="16" r="2.5" fill="currentColor" opacity="0.9" />
                    <line x1="12" y1="10.5" x2="7" y2="13.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                    <line x1="12" y1="10.5" x2="17" y2="13.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                    <circle cx="12" cy="8" r="1" fill="white" opacity="0.8" />
                    <circle cx="7" cy="16" r="1" fill="white" opacity="0.8" />
                    <circle cx="17" cy="16" r="1" fill="white" opacity="0.8" />
                </>
            ),
            shield: (
                <>
                    <path d="M12 4L7 6V11C7 14.5 9 17 12 19C15 17 17 14.5 17 11V6L12 4Z"
                        fill="currentColor" opacity="0.9" />
                    <path d="M10 11L11.5 13L14 9" stroke="white" strokeWidth="1.5"
                        fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                </>
            ),
            globe: (
                <>
                    <circle cx="12" cy="12" r="7" fill="currentColor" opacity="0.9" />
                    <ellipse cx="12" cy="12" rx="3" ry="7" fill="none" stroke="white"
                        strokeWidth="1.5" opacity="0.7" />
                    <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="1.5" opacity="0.7" />
                    <path d="M12 5C13 7 13.5 9.5 13.5 12C13.5 14.5 13 17 12 19"
                        stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" />
                </>
            )
        };
        return icons[iconType] || icons.building;
    };

    const scheme = getColorScheme(company);
    const gradientId = `gradient-${company.replace(/\s+/g, '-')}`;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            style={{ borderRadius: '8px' }}
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={scheme.gradient[0]} />
                    <stop offset="100%" stopColor={scheme.gradient[1]} />
                </linearGradient>
            </defs>

            {/* Background */}
            <rect width="24" height="24" rx="4" fill={`url(#${gradientId})`} />

            {/* Icon */}
            <g color={scheme.iconColor}>
                {getIcon(scheme.icon)}
            </g>
        </svg>
    );
}
