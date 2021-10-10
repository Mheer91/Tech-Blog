const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    }
    else {
        M.toast({ html: 'Error logging out, please try again!' })
    }
};

document.querySelector('#logout').addEventListener('click', logout);
document.querySelector('#logoutMobile').addEventListener('click', logout);