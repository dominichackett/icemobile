export const  formatString = (inputString)=> {
    if(!inputString)
    return null
    // Split the input string at the colon
    const parts = inputString.split(':');
  
    // Check if there are at least two parts
    if (parts.length >= 2) {
      // Get the second part and remove any leading and trailing spaces
      const secondPart = parts[1].trim();
  
      // Remove the "en" character from the second part
      const result = secondPart.replace(/^en/, '');
  
      return result;
    } else {
      // Return an empty string or handle the error as needed
      return '';
    }
  }