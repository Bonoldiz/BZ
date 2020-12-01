/** 
 * @method buildAction
 * @param {string} type - the action raw type to reduce
 * @param {Object} payload - the action payload to reduce
 */
export const buildAction = (type,payload = {}) => {
    return {type,payload}
} 