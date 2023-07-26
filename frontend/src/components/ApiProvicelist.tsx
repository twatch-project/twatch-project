import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FetchProivce from '../hooks/ProviceAPI';
import FetchAmphure from '../hooks/AmphureAPI';
import { AmphureDTO, TambonDTO } from '../types/ProviceList.hook';
import AddressThai from '../hooks/AddressThai';

export default function Provicelist() {
  const { provinces } = FetchProivce();
  const { Amphure } = FetchAmphure();
  const { tambons } = AddressThai();
  const [province, setProvince] = React.useState<{ id: number; name_th: string } | null>(null);
  const [amphure, setAmphure] = React.useState<{ id: number; name_th: string } | null>(null);
  const [amphureId, setAmphureId] = React.useState<AmphureDTO[] | null>(null);
  const [tambon, setTambon] = React.useState('');
  const [tambonId, setTambonId] = React.useState<TambonDTO[] | null>(null);

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
    setTambon(event.target.value);
  };
  return (
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
          value={tambon}
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
  );
}
