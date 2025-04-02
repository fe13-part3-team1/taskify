const EXTERNAL_API = {
  AUTH: {
    LOGIN: '/auth/login',
    CHANGE_PASSWORD: '/auth/password',
  },
  CARDS: {
    ROOT: '/cards',
    getDetail: (cardId: number) => `/cards/${cardId}`,
  },
  COLUMNS: {
    ROOT: '/columns',
    getDetail: (columnId: number) => `/columns/${columnId}`,
    uploadCardImage: (columnId: number) => `/columns/${columnId}/card-image`,
  },
  COMMENTS: {
    ROOT: '/comments',
    getDetail: (commentId: number) => `/comments/${commentId}`,
  },
  DASHBOARDS: {
    ROOT: '/dashboards',
    getDetail: (dashboardId: number) => `/dashboards/${dashboardId}`,
    invite: (dashboardId: number) => `/dashboards/${dashboardId}/invitations`,
    cancelInvite: (dashboardId: number, invitationId: number) =>
      `/dashboards/${dashboardId}/invitations/${invitationId}`,
  },
  INVITATIONS: {
    ROOT: '/invitations',
    acceptInvitation: (invitationId: number) => `/invitations/${invitationId}`,
  },
  MEMBERS: {
    ROOT: '/members',
    getDetail: (memberId: number) => `/members/${memberId}`,
  },
  USERS: {
    SIGNUP: '/users',
    GET_ME: '/users/me',
    UPDATE_ME: '/users/me',
    UPLOAD_PROFILE_IMAGE: '/users/me/image',
  },
};

export default EXTERNAL_API;
