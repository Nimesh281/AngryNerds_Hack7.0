import {
    Avatar,
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React,{useEffect,useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import { inputLabelClasses } from "@mui/material/InputLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function AddProduct() {
    const navigate=useNavigate();
    const [uploadedImages, setUploadedImages] = React.useState([]);
    const [imageLimit, setImageLimit] = React.useState(false);
    const [user, setUser] = useState();
    const [state,setState] = useState({
        "productName":"",
        "category":"",
        "price":"",
      });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value; 
        setState({...state,[name]:value});
      }




      const handleUploadImages = (files) => {
        const uploaded = [...uploadedImages];
        let limitExceeded = false;
    
        files.some((file) => {
          if (uploaded.findIndex((f) => f.name === file.name) === -1) {
            uploaded.push(file);
            if (uploaded.length === 5) {
              setImageLimit(true);
            }
            if (uploaded.length > 5) {
    
              setImageLimit(false);
              limitExceeded = true;
              return true;
            }
          }
        });
    
        if (!limitExceeded) {
          setUploadedImages(uploaded);
        }
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('productName',state.productName);
        formData.append('category',state.category);
        formData.append('price',state.price);
        formData.append('owner_id',user._id);
        formData.append('image',uploadedImages);
        const options = {
          method: 'POST',
          url: 'http://localhost:3000/api/user/v1/addProduct',
          data: formData
        };
    
        axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            Swal.fire({
                title: 'Done!',
                text: 'Product Added Successfully!',
                icon: 'succcess',
                confirmButtonText: 'Cool'
              })
            // sessionStorage.setItem("current_user", response.data.data.user);
        })
        .catch(function (error) {
            console.error(error);
        });

      }
    useEffect(()=>{
        let data = JSON.parse(sessionStorage.getItem("current_user"));
        if (data) {
          setUser(data);
        }

    },[])


    const submitSellerRequest = async()=>{
        
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/api/user/v1/sellerRequest',
            data: {"customer_id":user._id}
          };
      
        axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
        Swal.fire({
            title: 'seller Request Submitted',
            text: 'Admin will verify you to become a seller',
            icon: 'Note',
            confirmButtonText: 'Cool'
          })
        // sessionStorage.setItem("current_user", response.data.data.user);
    })
    .catch(function (error) {
        console.error(error);
    });

    }



    useEffect(()=>{
        console.log(user)
        if(user?.isVerified==false){
            
        }
    },[user])

    return (
        <div>
            <Navbar />
            <div
                className="profile_container"
                style={{
                    display: "flex",
                    //   alignItems: "center",
                    //   justifyContent: "center",
                    flexDirection: "row",
                    margin: "0 200px",
                }}
            >
                <div
                    className="profile_image"
                    style={{
                        flex: 1,
                        padding: "30px",
                        border: "1px solid grey",
                        borderRadius: "1rem",
                        marginTop: "152px ",
                        height: "400px",
                        backgroundColor: "#D8F5DE",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            pt: 4,
                        }}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 156, height: 156, mb: 2 }}
                        />
                        <Typography varinat="h2" fontSize={30} sx={{ mb: 3 }}>
                            Product Name 
                        </Typography>
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            sx={{
                                backgroundColor: "#0A410A", '&:hover': {
                                    backgroundColor: "#379237"
                                }
                            }}
                        >
                            Upload Product Image
                            <input onChange={(e) => {
                        const chosenImages = Array.prototype.slice.call(
                          e.target.files
                        );
                        handleUploadImages(chosenImages);
                      }} hidden accept="image/*" multiple type="file" />
                        </Button>
                    </Box>
                </div>
                <div
                    className="profile_details"
                    style={{ flex: 3, padding: "20px 50px " }}
                >
                    <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
                    <Typography variant="h4" style={{ color: "#379237" }}>ADD Product </Typography>
                     {user?.isVerified==false &&   <button style={{padding:"15px",backgroundColor:"#0A410A",color:"white",borderRadius:"10px"}} onClick={()=>submitSellerRequest}>Make Seller Request</button>}
                    </div>
                    <Typography variant="h6" style={{ color: "#379237" }}>Add Product Details</Typography>
                    <Grid container spacing={2} sx={{ mt: 5 }}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="product-name"
                                required
                                fullWidth
                                name="productName"
                                id="product-name"
                                label="Product Name"
                                autoFocus
                                onChange={handleChange}
                                InputLabelProps={{
                                    sx: {
                                        // set the color of the label when not shrinked
                                        color: "#0a410a",
                                        [`&.${inputLabelClasses.shrink}`]: {
                                            // set the color of the label when shrinked (usually when the TextField is focused)
                                            color: "#0a410a"
                                        }
                                    }
                                }}
                                sx={{
                                    input: { color: ' #0a410a' }, "& .MuiOutlinedInput-root.Mui-focused": {
                                        "& > fieldset": {
                                            borderColor: "#379237"
                                        }
                                    },
                                    "& .MuiInputLabel-root": { color: 'green' },
                                    "& .MuiFilledInput-input": { color: "#379237" }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="Price"
                                label="Product Price (₹)"
                                name="price"
                                autoComplete="Price"
                                onChange={handleChange}
                                InputLabelProps={{
                                    sx: {
                                        // set the color of the label when not shrinked
                                        color: "#0a410a",
                                        [`&.${inputLabelClasses.shrink}`]: {
                                            // set the color of the label when shrinked (usually when the TextField is focused)
                                            color: "#0a410a"
                                        }
                                    }
                                }}
                                sx={{
                                    input: { color: ' #0a410a' }, "& .MuiOutlinedInput-root.Mui-focused": {
                                        "& > fieldset": {
                                            borderColor: "#379237"
                                        }
                                    },
                                    "& .MuiInputLabel-root": { color: 'green' },
                                    "& .MuiFilledInput-input": { color: "#379237" }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth sx={{ my: 3 }}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Category"
                                    name="category"
                                    onChange={(e)=>{setState({...state,[e.target.name]:e.target.value})}}
                                    InputLabelProps={{
                                        sx: {
                                            // set the color of the label when not shrinked
                                            color: "#0a410a",
                                            [`&.${inputLabelClasses.shrink}`]: {
                                                // set the color of the label when shrinked (usually when the TextField is focused)
                                                color: "#0a410a"
                                            }
                                        }
                                    }}
                                    sx={{
                                        input: { color: ' #0a410a' }, "& .MuiOutlinedInput-root.Mui-focused": {
                                            "& > fieldset": {
                                                borderColor: "#379237"
                                            }
                                        },
                                        "& .MuiInputLabel-root": { color: 'green' },
                                        "& .MuiFilledInput-input": { color: "#379237" }
                                    }}
                                >
                                    <MenuItem value={"Tractor"}>Tractor</MenuItem>
                                    <MenuItem value={"Tool"}>Tool</MenuItem>
                                    <MenuItem value={"Fertilizers"}>Fertilizers</MenuItem>
                                    <MenuItem value={"Vehicles"}>Vehicles</MenuItem>
                                    <MenuItem value={"Animal"}>Animal</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ mb: 3 }} fullWidth>
                                <InputLabel id="demo-simple-select-label">Buy/Rent</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="onRent"
                                    label="Brands"
                                    onChange={(e)=>{setState({...state,[e.target.name]:e.target.value==="BUY"?false:true})}}
                                >
                                    <MenuItem value={"BUY"}>FOR BUY</MenuItem>
                                    <MenuItem value={"RENT"}>FOR RENT</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ mb: 3 }} fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Duration
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Brands"
                                // onChange={handleChange}
                                >
                                    <MenuItem value={"1 to 5 days "}>1 to 5 days</MenuItem>
                                    <MenuItem value={"5 to 10 days"}>5 to 10 days</MenuItem>
                                    <MenuItem value={"10 to 15 days"}>10 to 15 days</MenuItem>
                                    <MenuItem value={"15 to 20 days"}>15 to 20 days</MenuItem>
                                    <MenuItem value={"1 month"}>1month</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Location (City)
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Loaction (City)"
                                // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Jalandhar</MenuItem>
                                    <MenuItem value={20}>Rajkot</MenuItem>
                                    <MenuItem value={30}>Thane</MenuItem>
                                    <MenuItem value={30}>Thane</MenuItem>
                                    <MenuItem value={30}>Thane</MenuItem>
                                    <MenuItem value={30}>Thane</MenuItem>
                                    <MenuItem value={30}>Thane</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">State</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Loaction (City)"
                                // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Maharsathra</MenuItem>
                                    <MenuItem value={20}>Gujarat</MenuItem>
                                    <MenuItem value={30}>Thane</MenuItem>
                                    <MenuItem value={30}>Thane</MenuItem>
                                    <MenuItem value={30}>Thane</MenuItem>
                                    <MenuItem value={30}>Thane</MenuItem>
                                    <MenuItem value={30}>Thane</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <Button onClick={handleSubmit} variant="contained" fullWidth sx={{
                            marginTop: '20px', marginLeft: "20px", backgroundColor: "#0A410A", '&:hover': {
                                backgroundColor: "#379237"
                            }
                        }}>Uplaod Products</Button>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
