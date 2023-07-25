import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormEvent } from 'react';
import {
  Box,
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

const tags = [
  'MINIMALMODERN',
  'CONTEMPORARYMODERN',
  'MODERNLUXURY',
  'MODERNSTYLE',
  'MIDCENTURYMODERN',
  'VINTAGESTYLE',
  'LOFTINDUSTRALSTYLE',
  'SCANDINAVIANSTYLE',
  'ARTDECO',
  'MIXANDMATCH',
];

function getStyles(name: string, tag: readonly string[], theme: Theme) {
  return {
    fontWeight: tag.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function CreateCompanyProfile() {
  const [companyName, setCompanyName] = useState('');
  const [companyRegistration, setCompanyRegistration] = useState('');
  const [body, setBody] = useState('');
  const [imageContent, setImageContent] = useState('');
  const [address, setAddress] = useState('');
  // const [sub_district, setSub_district] = useState('');
  // const [district, setDistrict] = useState('');
  const [contract, setContract] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  // const { CompanyProfile } = useAuth()
  const navigate = useNavigate();
  const { provinces } = FetchProivce();
  const { Amphure } = FetchAmphure();
  const { tambons } = FetchTambon();
  const [province, setProvince] = React.useState<{ id: number; name_th: string } | null>(null);
  const [amphure, setAmphure] = React.useState<{ id: number; name_th: string } | null>(null);
  const [amphureId, setAmphureId] = React.useState<AmphureDTO[] | null>(null);
  const [tambon, setTambon] = React.useState<{ id: number; name_th: string } | null>(null);
  const [tambonId, setTambonId] = React.useState<TambonDTO[] | null>(null);

  const theme = useTheme();
  const [Tag, setTag] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof Tag>) => {
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

  const handlerSubmit = async (event: FormEvent<HTMLUnknownElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return setSubmitting(true);
    }
    try {
      if (!companyName) {
        return alert(`You don't have Company Name`);
      }
      console.log(
        amphure?.name_th,
        province?.name_th,
        tambon?.name_th,
        companyName,
        body,
        companyRegistration,
        address,
        contract,
        Tag,
      );
      // await CompanyProfile(
      //   companyName,
      //   companyRegistration,
      //   body,
      //   imageContent,
      //   province,
      //   address,
      //   sub_district,
      //   district,
      //   contract,
      //   tag,
      // )
      toast.success(`Successful Create CompanyProfile.`);

      navigate('/Home');
    } catch (err) {
      console.error(err);
      toast.error(`Unsuccessful Create Company Profile`);
    } finally {
      setSubmitting(false);
    }
  };
  // console.log(amphure?.name_th, province?.name_th, tambon?.name_th);
  // console.log(companyName, companyRegistration, body, amphureId, tambonId);
  return (
    <>
      <section className="flex justify-center">
        <form
          onSubmit={handlerSubmit}
          className="flex w-[600px] border-[0.5px]  flex-col items-center justify-center  rounded-md p-8 gap-y-[10px] m-[15px] "
        >
          <h1 className="font-bold ">CREATE COMPANY PROFILE</h1>
          <div className="imgBx bg-slate-400  w-[100px] h-[100px] rounded-full overflow-hidden">
            <img className=" w-full h-full rounded-full truncate" src="" alt="" />
          </div>
          <div className="upload ">
            <input
              type="file"
              className="m-[15px] w-[120px] bg-blue text-white p-[5px] rounded-[5px] text-sm"
              placeholder="Upload file"
            />
          </div>
          <div className="input">
            <label className="flex flex-col text-black my-1 font-bold">COMPANY NAME</label>
            <input
              type="text"
              value={companyName}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">COMPANY REGISTRATION NUMBER</label>
            <input
              type="text"
              value={companyRegistration}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setCompanyRegistration(e.target.value)}
              required
            />
          </div>
          <div className="input">
            {/* <label className=" flex flex-col text-black my-1 font-bold">BODY</label>
            <input
              type="text"
              value={body}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setBody(e.target.value)}
              required
            /> */}
            <TextField
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
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">IMAGE</label>
            <input
              type="file"
              value={imageContent}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setImageContent(e.target.value)}
              required
            />
          </div>

          <div>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
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

            <FormControl sx={{ m: 1, minWidth: 80 }}>
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

            <FormControl sx={{ m: 1, minWidth: 80 }}>
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
            <label className=" flex flex-col text-black my-1 font-bold">ADDRESS</label>
            <input
              type="text"
              value={address}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">CONTRACT</label>
            <input
              type="text"
              value={contract}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setContract(e.target.value)}
              required
            />
          </div>
          {/* <TagSelect /> */}
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={Tag}
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
                {tags.map((tag) => (
                  <MenuItem key={tag} value={tag} style={getStyles(tag, Tag, theme)}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <button className="my-[10px] p-[10px] bg-blue rounded text-white" disabled={isSubmitting}>
            CONFIRM
          </button>
        </form>
      </section>
    </>
  );
}
