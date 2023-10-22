export const  iceContractAddress = "0x53B382216EB5CDC7b83455bb9D5d7E4202F21f56"
export const iceContractABI = [
    'function  withdrawAllTokens() external',
    'function  createTag(string memory _tagId, string memory _cid) external',
    'function  addEmergencyContact(address _contactAddress, string memory _name) external',
    'function  deleteEmergencyContact(address _contactAddress) external',
    'function updateTagCID(string memory newCID) external'
    // Add more function headers as needed
  ];