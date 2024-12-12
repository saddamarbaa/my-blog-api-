"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfilePicture = void 0;
const getProfilePicture = (firstName, lastName, gender, profileUrl) => {
    if (profileUrl)
        return profileUrl;
    const userName = `${firstName}${lastName}`;
    const randomProfileUrl = `https://avatar.iran.liara.run/username?username=${userName}`;
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    return gender === 'female' ? girlProfilePic : gender === 'male' ? boyProfilePic : randomProfileUrl;
};
exports.getProfilePicture = getProfilePicture;
//# sourceMappingURL=getProfilePicture.js.map