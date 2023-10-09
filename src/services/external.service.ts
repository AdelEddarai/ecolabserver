import { Logger } from '../helpers/GlobalUtils';

const log = new Logger();

/**
 * https://www.metered.ca/tools/openrelay/#-stun-server-usage
 */
const fallbackTurnServer = {
  iceServers: [
    {
      urls: 'stun:openrelay.metered.ca:80',
    },
    {
      urls: 'turn:openrelay.metered.ca:80',
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
    {
      urls: 'turn:openrelay.metered.ca:443',
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
    {
      urls: 'turn:openrelay.metered.ca:443?transport=tcp',
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
  ],
};

/**
 * Generate a TURN server
 * @returns object
 */
export async function getTurnServer() {
  return fallbackTurnServer;
}
