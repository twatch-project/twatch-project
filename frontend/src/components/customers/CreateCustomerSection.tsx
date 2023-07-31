import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormEvent } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Theme } from '@mui/material';
import { host } from '../../constant';
import { useAuth } from '../../providers/AuthProvider';
import useAddressThai from '../../hooks/useAddressThai';
import { AmphureDto, TambonDto } from '../../types/dto';

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

const CreateCustomerSection = () => {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [citizenId, setCitizenId] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [postCode, setPostCode] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { provinces, amphures, tambons } = useAddressThai();
  const [province, setProvince] = useState<{ id: number; name_en: string } | null>(null);
  const [amphure, setAmphure] = useState<{ id: number; name_en: string } | null>(null);
  const [amphureId, setAmphureId] = useState<AmphureDto[] | null>(null);
  const [tambon, setTambon] = useState<{ id: number; name_en: string } | null>(null);
  const [tambonId, setTambonId] = useState<TambonDto[] | null>(null);
  const { token } = useAuth();

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

  const handleChangeGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
    console.log(gender);
  };

  const handlerSubmit = async (event: FormEvent<HTMLUnknownElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return setSubmitting(true);
    }
    try {
      if (!tambon?.name_en || !amphure?.name_en || !province?.name_en || !postCode) {
        return;
      }

      const res = await fetch(`${host}/customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          citizenId: citizenId,
          address: address,
          sub_district: tambon.name_en,
          district: amphure.name_en,
          province: province.name_en,
          postCode: postCode,
          contact: contact,
        }),
      });

      const status = await res.status;
      if (status === 500) {
        return;
      }

      toast.success(`Successful Create Customer`);
      navigate(`/`);
    } catch (err) {
      console.error(err);
      toast.error(`Unsuccessful Create Customer`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center my-10">
      <form
        onSubmit={handlerSubmit}
        className="flex w-1/2 border-[0.5px]  flex-col items-center justify-center  rounded-md p-8 gap-y-[20px] m-auto drop-shadow-lg hover:drop-shadow-xl"
      >
        <h1 className="font-bold ">CREATE CUSTOMER</h1>
        <div className="w-full">
          <TextField
            className="w-full"
            id="outlined-basic"
            label="FIRSTNAME"
            value={firstname}
            variant="outlined"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <TextField
            className="w-full"
            id="outlined-basic"
            label="LASTNAME"
            type="text"
            rows={10}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">GENDER</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="GENDER"
            onChange={handleChangeGender}
          >
            <MenuItem value="MALE">MALE</MenuItem>
            <MenuItem value="FEMALE">FEMALE</MenuItem>
            <MenuItem value="UNSPECIFINED">UNSPECIFINED</MenuItem>
          </Select>
        </FormControl>
        <div className="w-full">
          <TextField
            className="w-full"
            id="outlined-basic"
            label="CITIZENID"
            type="text"
            rows={10}
            value={citizenId}
            onChange={(e) => setCitizenId(e.target.value)}
            required
          />
        </div>
        <div className="w-auto">
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-autowidth-label">PROVINCE</InputLabel>
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
            <InputLabel id="demo-simple-select-autowidth-label">DISTRICT</InputLabel>
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
            <InputLabel id="demo-simple-select-autowidth-label">SUB-DISTRICT</InputLabel>
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
            required
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
            required
          />
        </div>
        <div className="w-full">
          <TextField
            className="w-full"
            id="outlined-basic"
            label="POSTCODE"
            value={postCode}
            variant="outlined"
            type="text"
            onChange={(e) => setPostCode(e.target.value)}
            required
          />
        </div>
        <button className="btn hover:bg-sky-500" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default CreateCustomerSection;
