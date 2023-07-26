import React, { ChangeEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormEvent } from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from '@mui/material';
import { AmphureDTO, TambonDTO } from '../types/ProviceList.hook';
import profileimg from '../img/user.png';
import { Tags } from '../constant';
import AddressThai from '../hooks/AddressThai';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, tag: readonly string[], theme: Theme) {
  return {
    fontWeight: tag.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function CreateCompanyProfile() {
  const filesInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [companyName, setCompanyName] = useState<string>('');
  const [companyRegistration, setCompanyRegistration] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { provinces, amphures, tambons } = AddressThai();
  const [province, setProvince] = React.useState<{ id: number; name_th: string } | null>(null);
  const [amphure, setAmphure] = React.useState<{ id: number; name_th: string } | null>(null);
  const [amphureId, setAmphureId] = React.useState<AmphureDTO[] | null>(null);
  const [tambon, setTambon] = React.useState<{ id: number; name_th: string } | null>(null);
  const [tambonId, setTambonId] = React.useState<TambonDTO[] | null>(null);
  const [imageProfile, setImageProfile] = useState<boolean>(true);
  const theme = useTheme();
  const [tags, setTags] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeProvice = (event: SelectChangeEvent) => {
    const selectedProvince = provinces.find((province) => province.name_th === event.target.value);

    if (selectedProvince) {
      setProvince(selectedProvince);
      const filteredAmphure = amphures.filter((amp) => amp.province_id === selectedProvince.id);
      setAmphureId(filteredAmphure);
      setTambonId([]);
    } else {
      setProvince(null);
      setAmphureId([]);
    }
  };

  const handleChangeAmphure = (event: SelectChangeEvent) => {
    const selectedAmphure = amphures.find((ampher) => ampher.name_th === event.target.value);

    if (selectedAmphure) {
      setAmphure(selectedAmphure);
      const filteredTambon = tambons.filter((tambon) => tambon.amphure_id === selectedAmphure.id);
      setTambonId(filteredTambon);
    } else {
      setAmphure(null);
      setTambonId([]);
    }
  };

  const handleChangeTambon = (event: SelectChangeEvent) => {
    const selectedTambon = tambons.find((tb) => tb.name_th === event.target.value);
    if (selectedTambon) {
      setTambon(selectedTambon);
    }
  };

  //Upload image profile company
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
    setImageProfile(false);
  };

  //UploadFile image company profile
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...Array.from(files)]);
    }
  };

  const handleAddFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleAddFiles = () => {
    if (filesInputRef.current) {
      filesInputRef.current.click();
    }
  };
  const handlerSubmit = async (event: FormEvent<HTMLUnknownElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return setSubmitting(true);
    }
    try {
      try {
        if (selectedFile) {
          console.log('File is being uploaded...', selectedFile.name);

          const formData = new FormData();
          formData.append('file', selectedFile);

          fetch('upload_endpoint', {
            method: 'POST',
            body: formData,
          })
            .then((response) => {
              // Handle the response from the server if needed.
              console.log('File uploaded successfully:', response);
            })
            .catch((error) => {
              // Handle errors during the file upload.
              console.error('Error uploading file:', error);
            });
        }
        for (const file of selectedFiles) {
          console.log('Selected file:', file.name);

          // Upload the file (you can implement your upload logic here).
          const formData = new FormData();
          formData.append('file', file);

          // Replace 'your_upload_endpoint' with your actual API endpoint for file upload.
          const response = await fetch('upload_endpoint', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            console.log(`File "${file.name}" uploaded successfully.`);
          } else {
            console.log(`File "${file.name}" upload failed.`);
          }
        }

        // Clear the selectedFiles array after uploading.
        setSelectedFiles([]);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
      if (!companyName) {
        return alert(`You don't have Company Name`);
      }

      if (
        !amphure?.name_th ||
        !province?.name_th ||
        !tambon?.name_th ||
        !companyName ||
        !body ||
        !companyRegistration ||
        !address ||
        !contact ||
        !postCode
      ) {
        toast.error('Fill someting');
      }
      console.log(
        'amphure',
        amphure?.name_th,
        'provice',
        province?.name_th,
        'tambon',
        tambon?.name_th,
        'companyname',
        companyName,
        'body',
        body,
        'company',
        companyRegistration,
        'address',
        address,
        'contract',
        contact,
        'zipcode',
        postCode,
        'tag',
        tags,
      );
      toast.success(`Successful Create CompanyProfile.`);

      navigate('/home');
    } catch (err) {
      console.error(err);
      toast.error(`Unsuccessful Create Company Profile`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="flex justify-center my-10">
        <form
          onSubmit={handlerSubmit}
          className="flex w-1/2 border-[0.5px]  flex-col items-center justify-center  rounded-md p-8 gap-y-[20px] m-auto drop-shadow-lg hover:drop-shadow-xl"
        >
          <h1 className="font-bold ">CREATE COMPANY PROFILE</h1>
          {imageProfile ? (
            <>
              <div className="imgBx bg-slate-400  w-[100px] h-[100px] rounded-full overflow-hidden">
                <img className="w-full h-full rounded-full truncate" src={profileimg} alt="imageprofile" />
              </div>
            </>
          ) : (
            <>
              {selectedFile && (
                <>
                  <div className="imgBx bg-slate-400  w-[100px] h-[100px] rounded-full overflow-hidden">
                    <img
                      className="w-full h-full rounded-full truncate"
                      src={URL.createObjectURL(selectedFile)}
                      alt="image-profile"
                    />
                  </div>
                </>
              )}
            </>
          )}
          <div className="upload flex flex-col items-center">
            <input
              type="file"
              className="m-[15px] w-[120px] bg-blue text-white p-[5px] rounded-[5px] text-sm "
              placeholder="Upload file"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <Button variant="outlined" type="button" onClick={handleAddFile}>
              Profile IMAGE
            </Button>
            <p>{selectedFile?.name}</p>
          </div>
          <div className="w-full">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="COMPANY NAME"
              value={companyName}
              variant="outlined"
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="COMPANY REGISTRATION NUMBER"
              value={companyRegistration}
              variant="outlined"
              type="text"
              onChange={(e) => setCompanyRegistration(e.target.value)}
              required
            />
            {/* <label className=" flex flex-col text-black my-1 font-bold">COMPANY REGISTRATION NUMBER</label>
            <input
              type="text"
              value={companyRegistration}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setCompanyRegistration(e.target.value)}
              required
            /> */}
          </div>
          <div className="w-full">
            <TextField
              className="w-full"
              id="outlined-multiline-static"
              label="BODY"
              multiline
              type="text"
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <input type="file" ref={filesInputRef} style={{ display: 'none' }} onChange={handleFileSelect} multiple />
            <Button variant="outlined" type="button" onClick={handleAddFiles}>
              Add File
            </Button>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
          <div className="w-auto">
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Provice</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={province ? province.name_th : ''}
                onChange={handleChangeProvice}
                autoWidth
                label="Provice"
              >
                {provinces &&
                  provinces.map((province) => (
                    <MenuItem key={province.id} value={province.name_th}>
                      {province.name_th}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Amphure</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={amphure ? amphure.name_th : ''}
                onChange={handleChangeAmphure}
                autoWidth
                label="amphure"
              >
                {amphureId &&
                  amphureId.map((amphure) => (
                    <MenuItem key={amphure.province_id} value={amphure.name_th}>
                      {amphure.name_th}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Tambon</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={tambon ? tambon.name_th : ''}
                onChange={handleChangeTambon}
                autoWidth
                label="tambons"
              >
                {tambonId &&
                  tambonId.map((tambon) => (
                    <MenuItem key={tambon.id} value={tambon.name_th}>
                      {tambon.name_th}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          <div className="w-full">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="ADDRESS"
              value={address}
              variant="outlined"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="CONTRACT"
              value={contact}
              variant="outlined"
              type="text"
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Zipcode"
              variant="outlined"
              type="number"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
              inputProps={{
                min: 0,
              }}
              required
            />
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={tags}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {Tags.map((tag) => (
                  <MenuItem key={tag} value={tag} style={getStyles(tag, tags, theme)}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <button className="btn hover:bg-sky-500" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
