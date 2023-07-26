import { ChangeEvent, useRef } from 'react';
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
import FetchAmphure from '../hooks/AmphureAPI';
import FetchProivce from '../hooks/ProviceAPI';
import FetchTambon from '../hooks/TambonsAPI';
import { AmphureDTO, TambonDTO } from '../types/ProviceList.hook';
import { Tags, host } from '../constant';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';
import SendIcon from '@mui/icons-material/Send';
// import { Link } from 'react-router-dom';

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

const EditPortfolioSection = () => {
  // const { isLoggedIn, logout } = useAuth();
  const [title, setTitle] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [body, setBody] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { provinces } = FetchProivce();
  const { Amphure } = FetchAmphure();
  const { tambons } = FetchTambon();
  const [province, setProvince] = useState<{ id: number; name_th: string } | null>(null);
  const [amphure, setAmphure] = useState<{ id: number; name_th: string } | null>(null);
  const [amphureId, setAmphureId] = useState<AmphureDTO[] | null>(null);
  const [tambon, setTambon] = useState<{ id: number; name_th: string } | null>(null);
  const [tambonId, setTambonId] = useState<TambonDTO[] | null>(null);
  const [tags, setTag] = useState<string[]>([]);
  const { portId } = useParams();

  const theme = useTheme();
  const { token } = useAuth();

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTag(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeProvice = (event: SelectChangeEvent) => {
    const selectedProvince = provinces.find((province) => province.name_th === event.target.value);

    if (selectedProvince) {
      setProvince(selectedProvince);
      const filteredAmphure = Amphure.filter((amp) => amp.province_id === selectedProvince.id);
      setAmphureId(filteredAmphure);
      setTambonId([]);
    } else {
      setProvince(null);
      setAmphureId([]);
    }
  };

  const handleChangeAmphure = (event: SelectChangeEvent) => {
    const selectedAmphure = Amphure.find((ampher) => ampher.name_th === event.target.value);

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

  const handlerSubmit = async (event: FormEvent<HTMLUnknownElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return setSubmitting(true);
    }
    try {
      const formData = new FormData();
      if (tambon?.name_th) {
        formData.append('sub_district', tambon?.name_th);
      }
      if (amphure?.name_th) {
        formData.append('district', amphure?.name_th);
      }
      if (province?.name_th) {
        formData.append('province', province?.name_th);
      }
      formData.append('title', title);
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('content', selectedFiles[i]);
      }
      formData.append('body', body);
      formData.append('address', address);
      formData.append('postCode', postCode);
      formData.append('contact', contact);
      for (let i = 0; i < tags.length; i++) {
        formData.append('tag', tags[i]);
      }
      console.log(...formData);
      console.log(token);
      await axios.patch(`${host}/portfolio/${portId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`Successful Edit Portfolio.`);
      setSelectedFiles([]);
      navigate(`/company`);
    } catch (err) {
      console.error(err);
      toast.error(`Unsuccessful Edit Portfolio`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="flex justify-center flex-col ">
        <form
          onSubmit={handlerSubmit}
          className="flex w-[600px] border-[0.5px]  flex-col items-center justify-center  rounded-md p-8 gap-y-[10px] m-[15px] "
        >
          {/* {isLoggedIn ? (
            <>
              <button onClick={logout} className="bg-blue py-[5px] px-[1rem] rounded text-white">
                logout
              </button>
            </>
          ) : (
            <>
              <Link to="/Register">SignUp</Link>
              <Link to="/Login" className="bg-blue py-[5px] px-[1rem] rounded text-white">
                Login
              </Link>
            </>
          )} */}
          <h1 className="font-bold text-[24px] my-[20px]">EDIT PORTFOLIO</h1>
          <div className="input">
            <TextField
              sx={{ width: 300, height: 70 }}
              id="outlined-multiline-static"
              label="TITLE"
              multiline
              type="text"
              // rows={10}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <TextField
              sx={{ width: 300, height: 70 }}
              id="outlined-multiline-static"
              label="BODY"
              multiline
              type="text"
              // rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-sm ">Multiple File Input Example</h1>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelect} multiple />
            <button
              className="p-[10px] border-black border-[0.5px] rounded-full hover:bg-blue hover:text-white duration-500"
              type="button"
              onClick={handleAddFile}
            >
              Add File
            </button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handlerSubmit}
              disabled={selectedFiles.length === 0}
            >
              Submit
            </Button>
            <ul className="flex justify-center">
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
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

            <FormControl sx={{ m: 1, minWidth: 120 }}>
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

            <FormControl sx={{ m: 1, minWidth: 100 }}>
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

          <div className="input">
            <TextField
              sx={{ width: 300, height: 70 }}
              id="outlined-multiline-static"
              label="ADDRESS"
              multiline
              type="address"
              // rows={10}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <TextField
              sx={{ width: 300, height: 70 }}
              id="outlined-multiline-static"
              label="ADDRESS"
              multiline
              type="address"
              // rows={10}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <TextField
              sx={{ width: 300, height: 70 }}
              id="outlined-multiline-static"
              label="CONTACT"
              multiline
              type="contact"
              // rows={10}
              value={contact}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          {/* <TagSelect /> */}
          <div>
            <FormControl sx={{ width: 300 }}>
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
          <button
            className="my-[10px] p-[10px] bg-blue rounded-lg text-white hover:border-black border-[0.5px] duration-500 hover:bg-white hover:text-black"
            disabled={isSubmitting}
          >
            CONFIRM
          </button>
        </form>
      </section>
    </>
  );
};

export default EditPortfolioSection;
