import {Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import {useEffect} from 'react';
import {ethers} from 'ethers';
import Web3 from "web3";
import {queriedProductList} from "./components/profile/dummylist.js"

import './App.css';
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import Storage from "./components/storage/storage";
import CreateProject from "./components/createProject/createProject";
import GetBacker from "./components/getbacker/getbacker";
import { CONTRACT_ABI, CONTRACT_ADDRESS, LIST_CONTRACT_ADDRESS, LIST_CONTRACT_ABI} from "./contracts/config";
import { ListGroup } from "react-bootstrap";

export default function App() {
    const [haveMetamask, setHaveMetamask] = useState(true);     // check if the browser has MetaMask installed.
    const [address, setAddress] = useState(null);               // address of connected MetaMask account.
    const [network, setNetwork] = useState(null);               // network the account is using.
    const [balance, setBalance] = useState(0);                  // balance of connected MetaMask account.
    const [isConnected, setIsConnected] = useState(false);      // check if is connected to MetaMask account.
    const [isBacked, setIsBacked] = useState([]);

    const [storedPending, setStoredPending] = useState(false);        // check if a value is pending.
    const [storedDone, setStoredDone] = useState(false);        // check if a value is stored.
    const [storedVal, setStoredVal] = useState(0);              // value that is stored right now.
    const [showVal, setShowVal] = useState(0);               // value that is showed on screen.

    const [milestoneVal, setMilestoneVal] = useState(0);

    const [historyRecord, setHistoryRecord] = useState(null);   // record of history operations.
    const [recordLen, setRecordLen] = useState(0);              // length of record.
    const maxRecordLen = 50;                                    // maximum length of record list.

    const navigate = useNavigate();
    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const listContract = new web3.eth.Contract(LIST_CONTRACT_ABI, LIST_CONTRACT_ADDRESS);

    const [voted, setVoted] = useState(2);
    const [disableEndBackingPhaseButton, setDisableEndBackingPhaseButton] = useState(false);
    const [disableRecountMilestoneButton, setDisableRecountMilestoneButton] = useState(false);

    const [addressList, setAddressList] = useState([]);
    const [projectsList, setProjectsList] = useState([]);


////// connect to MetaMask.
    const connectWallet = async () => {         // function that connect to METAMASK account, activated when clicking on 'connect'.
        try {
            if (!ethereum){
                setHaveMetamask(false);
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            const chainId = await ethereum.request({
                method: 'eth_chainId',
            });

            let balanceVal = await provider.getBalance(accounts[0]);
            let bal = ethers.utils.formatEther(balanceVal);

            console.log(chainId);
            if (chainId === '0x3'){
                setNetwork('Ropsten Test Network');
            }
            else {
                setNetwork('Other Test Network');
            }
            setAddress(accounts[0]);
            setBalance(bal);
            setIsConnected(true);

            navigate('/InterfaceDemo/profile');
        }
        catch (error){
            setIsConnected(false);
        }
    }


////// Contract Deployment.
    // IMPORTANT: async / await is essential to get values instead of Promise.
    const backProject = async () => {
        const res = await contract.methods.back().send({from: address, value: ethers.utils.parseEther("0.0001"), gasLimit:100000});
        return res;
    }

    const vote = async () => {
        const res = await contract.methods.voteOnMilestone(voted).send({from: address});
        return res;
    }

    const recountMilestone = async () => {
        const res = await contract.methods.recountMilestone().send({from: address});
        return res;
    }

    const backingPhaseEnd = async () => {
        const res = await contract.methods.backingPhaseEnd().send({from: address});
        return res;
    }

    const withdrawProject = async () => {
        const wid = await contract.methods.withdraw().call();
        return wid;
    }

    const getMilestoneVal = async () => {
        const miles = await contract.methods.getMilestone().call();
        return miles;
    }

    const getTotalBackingRequiredVal = async () => {
        const val = await contract.methods.getTotalBackingRequired().call();
        return val;
    }

    const getBackingVal = async () => {
        const val = await contract.methods.getTotalBacking().call();
        return val;
    }

    const getProjects = async() => {
      var contractList =[]
      var projectList = []
      const count = await listContract.methods.getCount().call();
      for(var i = 0; i < count; i++){
        const address = await listContract.methods.getProject(i).call();
        const projectContract = new web3.eth.Contract(CONTRACT_ABI, address);
        contractList.push(projectContract)
        const title = await projectContract.methods.getTitle().call();
        const description = await projectContract.methods.getDescription().call();
        const image = await projectContract.methods.getImage().call();
        projectList.push({'id':i, 'title':title, 'description': description,
        'image': image});
      }
      setProjectsList(projectList);
    }
    // const getData = async () => {
    //     //const count = await listContract.methods.getCount().call();
    //     const projectList = queriedProductList;//await listContract.methods.getProject().call(count);
    //     setContractList(projectList);
    //     // for(let i = 0; i < projectList.length; i++){
    //     //   setContractList(projectList[i]);
    //     //   console.log(contractList);
    //     // }
    //     //setContractList(projectList);
    // }

/// Let us allow the user to back a project
    const backProjectUpdate = async () => {
              try{
                  const detail = await backProject();   // contract deployed.
                  // RecordPush('back', project, address);      // recorded
                  setIsBacked(true);
              }
              catch(err){
                  console.log(CONTRACT_ADDRESS);
                  console.log(err);
              }
    }

    const voteUpdate = async () => {
        try{
            await vote();
        }
        catch(err){
            console.error(err);
        }
    }

    const recountMilestoneUpdate = async () => {
        try{
            await recountMilestone();
        }
        catch(err){
            console.error(err);
        }
    }

    const backingPhaseEndUpdate = async () => {
        try{
            await backingPhaseEnd();
        }
        catch(err){
            console.error(err);
        }
    }

    const withdrawProjectUpdate= async () => {
              try{
                  const detail = await withdrawProject();
                  setIsBacked(false);
              }
              catch(err){
                  console.log(err);
              }
    }

    const getMilestone = async() => {
            try{
                const miles = await getMilestoneVal();
                setMilestoneVal(miles);
                recalculateDisableButtons();
            }
            catch(err){
                console.log(err);
            }
    }


    const recalculateDisableButtons = async() => {
        const miles = await contract.methods.getMilestone().call();
        const endtime = await contract.methods.getBackingEndTime().call();

        const currentBlock = await provider.getBlockNumber();
        const blockTimestamp = (await provider.getBlock(currentBlock)).timestamp;

        setDisableEndBackingPhaseButton(!(miles == 1 && blockTimestamp > endtime));

        const milestoneAmount = await contract.methods.getMilestoneAmount().call();

        const payoutPercentageMilestone = await contract.methods.getPayoutPercentage(miles).call();

        var maxVotesI;
        var maxVotesNum;
        for(var i = 0; i < milestoneAmount; i++){
            const votes = await contract.methods.getVotesPerMilestone(i).call();
            const payoutPercentageI = await contract.methods.getPayoutPercentage(i).call();
            if((payoutPercentageI >= payoutPercentageMilestone) && (i != 1) && ((i > miles) || (i == 0))){
                if(votes > maxVotesNum){
                    maxVotesI = i;
                    maxVotesNum = votes;
                }
            }
        }
        var milestone = maxVotesI;

        setDisableRecountMilestoneButton(!(miles > 1 && miles != milestone));
    }


////// display functions.
    const ProfileDisplay = () => {
        return (
            <Profile
              projects = {projectsList}
            />
        )
    }

    const StorageDisplay = () => {
        return (
            <Storage
            />
        )
    }

    const CreateProjectDispay = () => {
        return (
            <CreateProject
            isConnected = {isConnected}
            address={address}
            provider={provider}
            />
        )
    }

    const BackerDisplay = () => {
        return (
            <GetBacker
                isConnected = {isConnected}
                address={address}
                isBacked={isBacked}
                storeValHandle={backProjectUpdate}
                getMilestone={getMilestone}
                milestone={milestoneVal}
                withdrawVal={withdrawProjectUpdate}
                voteHandle={voteUpdate}
                voted={voted}
                setVoted={setVoted}
                recountMilestoneUpdate={recountMilestoneUpdate}
                backingPhaseEndUpdate={backingPhaseEndUpdate}
                disableEndBackingPhaseButton={disableEndBackingPhaseButton}
                disableRecountMilestoneButton={disableRecountMilestoneButton}

            />
        )
    }

    useEffect(() => {
      getMilestone();
      getProjects();
    }, [""]);


    return (
        // <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path = "/InterfaceDemo" element = {<Login isHaveMetamask = {haveMetamask} connectTo = {connectWallet} />}></Route>
                    <Route path = "/InterfaceDemo/profile" element = {<ProfileDisplay/>}></Route>
                    <Route path = "/InterfaceDemo/storage" element = {<StorageDisplay/>}></Route>
                    <Route path = "/InterfaceDemo/createProject" element = {<CreateProjectDispay/>}></Route>
                    <Route path = "/InterfaceDemo/getbacker" element = {<BackerDisplay />}></Route>
                </Routes>
            </div>
        // </BrowserRouter>
    );
}
