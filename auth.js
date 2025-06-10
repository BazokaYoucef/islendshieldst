const CLIENT_ID = '1318679028420448257';
const REDIRECT_URI = 'https://sky-city-rp.netlify.app/callback.html';

function checkAuth() {
    const token = localStorage.getItem('discord_token');
    
    if (!token) {
        redirectToLogin();
        return false;
    }

    fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            localStorage.removeItem('discord_token');
            localStorage.removeItem('discord_user');
            redirectToLogin();
            return false;
        }
    })
    .catch(() => {
        localStorage.removeItem('discord_token');
        localStorage.removeItem('discord_user');
        redirectToLogin();
        return false;
    });

    return true;
}

function redirectToLogin() {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=identify`;
    window.location.href = url;
}

function checkTimeout(action) {
    const currentTime = new Date().getTime();
    
    if (action === 'shop') {
        const lastShopTime = localStorage.getItem('last_shop_time');
        if (lastShopTime) {
            const timeDiff = currentTime - parseInt(lastShopTime);
            const hoursDiff = timeDiff / (1000 * 60 * 60);
            if (hoursDiff < 3) {
                const remainingHours = Math.ceil(3 - hoursDiff);
                alert(`يجب الانتظار ${remainingHours} ساعات قبل الشراء مرة أخرى`);
                return false;
            }
        }
    } else if (action === 'apply') {
        const lastApplyTime = localStorage.getItem('last_apply_time');
        if (lastApplyTime) {
            const timeDiff = currentTime - parseInt(lastApplyTime);
            const hoursDiff = timeDiff / (1000 * 60 * 60);
            if (hoursDiff < 10) {
                const remainingHours = Math.ceil(10 - hoursDiff);
                alert(`يجب الانتظار ${remainingHours} ساعات قبل التقديم مرة أخرى`);
                return false;
            }
        }
    }
    return true;
}

function updateLastActionTime(action) {
    const currentTime = new Date().getTime();
    if (action === 'shop') {
        localStorage.setItem('last_shop_time', currentTime.toString());
    } else if (action === 'apply') {
        localStorage.setItem('last_apply_time', currentTime.toString());
    }
}

function getDiscordMention(user) {
    return `<@${user.id}>`;
}