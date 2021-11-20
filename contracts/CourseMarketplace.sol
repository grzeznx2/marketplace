// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint256 id;
        uint256 price;
        bytes32 proof;
        address owner;
        State state;
    }

    mapping(bytes32 => Course) private ownedCourses;
    mapping(uint256 => bytes32) private ownedCourseHash;
    uint256 private totalOwnedCourses;
    address payable private owner;

    /// CourseMarketplace: user already owns this course
    error AlreadyOwned();

    /// CourseMarketplace: only contract owner can perform this action
    error OnlyOwner();

    modifier onlyOwner(){
        if(msg.sender != owner){
            revert OnlyOwner();
        }
        _;
    }

    constructor(){
        _setContractOwner(msg.sender);
    }

    function transferOwnership(address newOwner) external onlyOwner{
        _setContractOwner(newOwner);
    }

    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

        if(_ownsCourse(courseHash)){
            revert AlreadyOwned();
        }

        uint id = totalOwnedCourses++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function getContractOwner() public view returns (address){
        return owner;
    }

    function getCourseCount() external view returns (uint256){
        return totalOwnedCourses;
    }

    function getCourseHashAt(uint256 index) external view returns (bytes32) {
        return ownedCourseHash[index];
    }

    function getCourseByHash(bytes32 courseHash) external view returns (Course memory) {
        return ownedCourses[courseHash];
    }

    function _ownsCourse(bytes32 courseHash) private view returns(bool){
        return ownedCourses[courseHash].owner == msg.sender;
    }

    function _setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }
}