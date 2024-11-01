import request from '@/core/request';

/**
 * List public cahiers
 */
export const listSchools = async () => {
    const data = await request('cahier-de-prepa.fr', '/connexion', {});

    if (data.ok) {
        
    }
}