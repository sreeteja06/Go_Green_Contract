pragma solidity ^0.5.1;
// import "./ECO_Coin.sol";

contract Eco_Coin{
    string public name = "Eco Coin";
    string public symbol = "Eco";
    string public standard = "Eco Coin v1.0";
    uint8 public decimals = 18; 
    uint256 public totalSupply;
    mapping(address => uint) public balanceOf;
            //key       //value
    mapping(address => mapping(address => uint256)) public allowance;
            //owner            //spender    //value
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor(uint256 _intialsupply) public{
        balanceOf[msg.sender] = _intialsupply;
        totalSupply = _intialsupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value,"doesnt have enough tokens to share");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success){

        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender,_spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(_value <= balanceOf[_from],"_value is greater than balance");
        require(_value <= allowance[_from][msg.sender],"_value is greater than allowed");
        emit Transfer(_from, _to, _value);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        return true;
    }   
}

contract Eco_Coin_Sale{

    struct UserDetails {
        string name;
        string deliveryAddress;
        uint32 Mobile_number;
        uint AmountOfWattsGenrated;
        uint AmountOfPlasticSold;
        uint AmountOfKarmaGenrated;
        bool flag;
    }
    mapping (address=>UserDetails) UsersData;
    address payable admin;
    Eco_Coin public tokenContract;
    uint256 public tokenPriceForWatts;
    uint256 public tokenPriceForPlastic;
    uint256 public tokenPriceForKarma;
    uint256 public tokensSold;

    event Sell(address _buyer, uint _amount);

    constructor(Eco_Coin _tokenContract, uint256 _tokenPriceForWatts, uint256 _tokenPriceForPlastic, uint256 _tokenPriceForKarma) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPriceForWatts = _tokenPriceForWatts;
        tokenPriceForPlastic = _tokenPriceForPlastic;
        tokenPriceForKarma = _tokenPriceForKarma;
    }

    function doesUserExist() public view returns (bool) {
        return UsersData[msg.sender].flag;
    }

    function getUserDetails() public view returns (string memory _name, string memory _deliveryAddress, uint32 _mobileNumber){
        require(doesUserExist());
        _name = UsersData[msg.sender].name;
        _deliveryAddress = UsersData[msg.sender].deliveryAddress;
        _mobileNumber = UsersData[msg.sender].Mobile_number;
    }

    function setUserDetails(string memory _name, string memory _deliveryAddress, uint32 _mobileNumber) public returns (bool){
        UsersData[msg.sender].name = _name;
        UsersData[msg.sender].deliveryAddress = _deliveryAddress;
        UsersData[msg.sender].Mobile_number = _mobileNumber;
        UsersData[msg.sender].flag = true;
    }

    function multiply(uint x, uint y) internal pure returns (uint z){
        require(y==0 || (z = x * y)/y==x, "return");
    }

    function KarmaForPureElectricity(uint256 _wattsGenerated) public{
        uint256 numberOfTokens = multiply(_wattsGenerated, tokenPriceForWatts);
        require(tokenContract.balanceOf(address(this)) >= numberOfTokens, "checks wheather the smart contract has enough tokens");
        require(tokenContract.transfer(msg.sender, numberOfTokens), "Requires the transaction to be successfull");
        tokensSold += numberOfTokens;
        UsersData[msg.sender].AmountOfWattsGenrated = _wattsGenerated;
        emit Sell(msg.sender, numberOfTokens);
    }

    function buyTokensForPlastic(uint256 _plasticSold) public{
        uint256 numberOfTokens = multiply(_plasticSold, tokenPriceForPlastic);
        require(tokenContract.balanceOf(address(this)) >= numberOfTokens, "checks wheather the smart contract has enough tokens");
        require(tokenContract.transfer(msg.sender, numberOfTokens), "Requires the transaction to be successfull");
        tokensSold += numberOfTokens;
        UsersData[msg.sender].AmountOfPlasticSold = _plasticSold;
        emit Sell(msg.sender, numberOfTokens);
    }
    
    function giftKarmaTokens(uint256 _karmaPoints) public{
        uint256 numberOfTokens = multiply(_karmaPoints, tokenPriceForKarma);
        require(tokenContract.balanceOf(address(this)) >= numberOfTokens, "checks wheather the smart contract has enough tokens");
        require(tokenContract.transfer(msg.sender, numberOfTokens), "Requires the transaction to be successfull");
        tokensSold += numberOfTokens;
        UsersData[msg.sender].AmountOfKarmaGenrated = _karmaPoints;
        emit Sell(msg.sender, numberOfTokens);
    }
    //ending the token sale
    function endSale() public restricted {
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))),"transfer the remaining tokens in the contract");
        selfdestruct(address(admin));
    }

    modifier restricted(){
        require(msg.sender == admin, "restricted to admin");
        _;
    }
}

