/** Add icons to notie notifies */
export const withIcon = (alertParams) => {
   switch (alertParams.type) {
      case 1:
      case "success":
         alertParams.text = `<i class="fas fa-check"></i>  ${alertParams.text}`
         break;
      case 2:
      case "warning":
         alertParams.text = `<i class="fas fa-exclamation"></i>  ${alertParams.text}`
         break;
      case 3:
      case "error":
         alertParams.text = `<i class="fas fa-times"></i>  ${alertParams.text}`
         break;
      case 4:
      case "info":
         alertParams.text = `<i class="fas fa-info"></i> ${alertParams.text}`
         break;
      case 5:
      case "neutral":
         break;
   }
   return alertParams
}
