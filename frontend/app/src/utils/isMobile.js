export const isMobile = () => {
   return (navigator.userAgent.includes("Mobile") && !navigator.userAgent.includes("Mobile/"))
}