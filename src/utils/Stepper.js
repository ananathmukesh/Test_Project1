import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, Avatar } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import axios from "axios";
import { chatserverUrl } from "../config/ServerUrl";
import { toast } from "react-toastify";



const steps = ["Search Users", "Create group"];

export default function HorizontalLinearStepper({ dataval, myFunction, arr, setArr,setOpenDialog }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [GroupName, setGroupName] = React.useState('');

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async(activesteps) => {
    let newSkipped = skipped;
   

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    try {
      if(activesteps.trim() === 'Add Group'){

        const user = JSON.parse(window.localStorage.getItem("auth"))
        const initialArray = arr;
        const additionalValue = user.user.id;
        
        const newArray = [...initialArray, additionalValue];


        const res = await axios.post(`${chatserverUrl}/addgroup`,{
         participant_id:JSON.stringify(newArray),
         group_name:GroupName
        });
 
        if(res.data){
         if(res.data.code === 200){
          setOpenDialog(false);
           toast.success(res.data.data.message);
           setArr([]);
           setGroupName('');
         }else{
           toast.success(res.data.data.message)
         }
        }
     
          console.log('add group');
        
     }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <table>
              <tbody>
                {dataval.map((el) => (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        id={el.id}
                        onChange={(e) => myFunction(e.target)}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </td>
                    <td>
                      <Avatar src={el.img} />
                    </td>

                    <td>
                      <Typography
                        variant="subtitle2"
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        {el.name}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeStep === 1 && (
            <div style={{ marginTop: '20px' }}>
      <div>
        <InputLabel htmlFor="group-name">Group Name</InputLabel>
        <TextField
          required
          id="group-name"
          label="Required"
          defaultValue="Add Group Name"
          onChange={(e)=>setGroupName(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <InputLabel htmlFor="other-field">Participant count</InputLabel>
        <TextField required id="other-field" label="Required" value={arr.length} />
      </div>
    </div>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={() => handleNext(activeStep === steps.length - 1 ? "Add Group" : "Next")}>
              {activeStep === steps.length - 1 ? "Add Group" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
