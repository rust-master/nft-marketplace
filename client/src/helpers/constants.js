export const categoryOptions = [
    { label: 'Art', value: 'art', icon: 'las la-palette' },
    { label: 'Music', value: 'music', icon: 'las la-music' },
    { label: 'Domain Names', value: 'domainNames', icon: 'las la-globe-americas' },
    { label: 'Virtual Worlds', value: 'virtualWorlds', icon: 'las la-vr-cardboard' },
    { label: 'Trading Cards', value: 'trendingCards', icon: 'las la-mail-bulk' },
    { label: 'Collectibles', value: 'collectibles', icon: 'las la-boxes' },
];

export const particlesOptions = {
    fpsLimit: 15,
    fullScreen: {
        enable: false,
    },
    particles: {
        color: {
            value: '#3275ac',
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: false,
            opacity: 0,
            width: 1,
        },
        collisions: {
            enable: false,
        },
        move: {
            direction: 'top',
            enable: true,
            outMode: 'out',
            random: true,
            speed: 0.5,
            straight: false,
        },
        number: {
            value: 250,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: 'circle',
        },
        size: {
            random: true,
            value: 4,
        },
    },
    detectRetina: true,
};
