export function timestampToText(timestamp) {
    const D = new Date(timestamp);
    let hrs = D.getHours();
    const dayPart = hrs < 12 ? 'AM' : 'PM';
    hrs = hrs > 12 ? hrs - 12 : hrs;
    let minutes = D.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const exactDay = D.getDate() < 10 ? `0${D.getDate()}` : D.getDate();
    const exactMonth = D.getMonth() < 10 ? `0${D.getMonth()}` : D.getMonth();
    const exactYear = D.getFullYear();

    const dayDiff = Math.floor( ( Date.now() - timestamp ) / ( 1000 * 60 * 60 * 24 ) );
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day =
        dayDiff === 0 ? `Today` :
        dayDiff === 1 ? `Yesterday` :
        dayDiff <= 7 ? weekDays[D.getDay()] :
        `${exactDay}-${exactMonth}-${exactYear}`
    
    return (`${day} at ${hrs}:${minutes} ${dayPart}`);
}

export function formatUser(user) {
    const id = user.name.toLowerCase().replace(/\s+/g, '');
    const name = user.name;
    const avatarURL = user.avatarURL;
    const answers = {};
    const questions = [];
    const newUser = {[id]: {id, name, avatarURL, questions, answers}};
    return newUser;
}