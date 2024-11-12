export const generateTaskId = () => {
  return (Math.random() + 1).toString(36).substring(2, 15) + 
         (Math.random() + 1).toString(36).substring(2, 15);
};