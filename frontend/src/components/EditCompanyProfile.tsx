import React, { ChangeEvent, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useAuth } from '../providers/AuthProvider';
import axios from 'axios';
import { Tags, host } from '../constant';
import { AmphureDto, TambonDto } from '../types/dto';
import useAddressThai from '../hooks/useAddressThai';
import { Link } from 'react-router-dom';
import useEditCompany from '../hooks/useEditCompany';

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

export default function EditCompanyProfile() {
  const filesInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [body, setBody] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { provinces, amphures, tambons } = useAddressThai();
  const [province, setProvince] = React.useState<{ id: number; name_en: string } | null>(null);
  const [amphure, setAmphure] = React.useState<{ id: number; name_en: string } | null>(null);
  const [amphureId, setAmphureId] = React.useState<AmphureDto[] | null>(null);
  const [tambon, setTambon] = React.useState<{ id: number; name_en: string } | null>(null);
  const [tambonId, setTambonId] = React.useState<TambonDto[] | null>(null);
  const { token } = useAuth();
  const [imageProfile, setImageProfile] = useState<boolean>(true);
  const theme = useTheme();
  const [tags, setTags] = React.useState<string[]>([]);

  const { companyId } = useParams();

  const {
    data,
    status: { loading },
  } = useEditCompany(companyId);

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
    const selectedProvince = provinces.find((province) => province.name_en === event.target.value);

    if (selectedProvince) {
      setProvince(selectedProvince);
      const filteredAmphure = amphures.filter((amphure) => amphure.province_id === selectedProvince.id);
      setAmphureId(filteredAmphure);
      setTambonId([]);
    } else {
      setProvince(null);
      setAmphureId([]);
    }
  };

  const handleChangeAmphure = (event: SelectChangeEvent) => {
    const selectedAmphure = amphures.find((amphure) => amphure.name_en === event.target.value);

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
    const selectedTambon = tambons.find((tambon) => tambon.name_en === event.target.value);
    if (selectedTambon) {
      setTambon(selectedTambon);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
    setImageProfile(false);
  };

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
      const formData = new FormData();

      if (!selectedFile) {
        toast.error('image not found');
        return;
      }
      formData.append('company', selectedFile);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('content', selectedFiles[i]);
      }
      setSelectedFiles([]);

      if (!body || !address || !contact || !postCode || !tambon?.name_en || !amphure?.name_en || !province?.name_en) {
        toast.error('Fill someting');
        return;
      }
      formData.append('contact', contact);
      formData.append('body', body);
      formData.append('postCode', postCode);
      formData.append('address', address);
      formData.append('sub_district', tambon?.name_en);
      formData.append('district', amphure?.name_en);
      formData.append('province', province?.name_en);
      for (let i = 0; i < tags.length; i++) {
        formData.append('tag', tags[i]);
      }
      await axios.patch(`${host}/company/${companyId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`Successful Edit CompanyProfile.`);
      navigate(`/company/${companyId}`);
    } catch (err) {
      console.error(err);
      toast.error(`Unsuccessful Edit Company Profile`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!data || loading)
    return (
      <div>
        <p>Loading</p>
      </div>
    );

  return (
    <>
      <section
        className="flex justify-center my-10
"
      >
        <form
          onSubmit={handlerSubmit}
          className="flex w-3/4 sm:w-3/5 md:w-1/2 border-[0.5px]  flex-col items-center justify-center  rounded-md p-8 gap-y-[20px] m-auto drop-shadow-lg hover:drop-shadow-xl"
        >
          <h1 className="font-bold ">EDIT COMPANY PROFILE</h1>
          {imageProfile ? (
            <div className="imgBx bg-slate-400  w-[100px] h-[100px] rounded-full overflow-hidden">
              <img className="w-full h-full rounded-full truncate" src={data.imageCompanyUrl} alt="imageprofile" />
            </div>
          ) : (
            <>
              {selectedFile && (
                <div className="imgBx bg-slate-400  w-[100px] h-[100px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full rounded-full truncate"
                    src={URL.createObjectURL(selectedFile)}
                    alt="image-profile"
                  />
                </div>
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
              id="outlined-multiline-static"
              label="BODY"
              multiline
              type="text"
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
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
                value={province ? province.name_en : ''}
                onChange={handleChangeProvice}
                autoWidth
                label="PROVINCE"
              >
                {provinces &&
                  provinces.map((province) => (
                    <MenuItem key={province.id} value={province.name_en}>
                      {province.name_en}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Amphure</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={amphure ? amphure.name_en : ''}
                onChange={handleChangeAmphure}
                autoWidth
                label="DISTRICT"
              >
                {amphureId &&
                  amphureId.map((amphure) => (
                    <MenuItem key={amphure.province_id} value={amphure.name_en}>
                      {amphure.name_en}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Tambon</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={tambon ? tambon.name_en : ''}
                onChange={handleChangeTambon}
                autoWidth
                label="SUB-DISTRICT"
              >
                {tambonId &&
                  tambonId.map((tambon) => (
                    <MenuItem key={tambon.id} value={tambon.name_en}>
                      {tambon.name_en}
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
            />
          </div>
          <div className="w-full">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="CONTACT"
              value={contact}
              variant="outlined"
              type="text"
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="w-full">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="POSTCODE"
              variant="outlined"
              type="number"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
              inputProps={{
                min: 0,
              }}
            />
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">TAGS</InputLabel>
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
          <Link to={`/company/${companyId}`}>
            <button className="btn hover:bg-sky-500" disabled={isSubmitting}>
              Back
            </button>
          </Link>
        </form>
      </section>
    </>
  );
}
