import { useState } from 'react';
import { AmphureDTO, TambonDTO } from '../types/ProviceList.hook';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import AddressThai from '../hooks/AddressThai';

export default function AddressSection() {
  const { provinces, amphures, tambons } = AddressThai();
  const [province, setProvince] = useState<{ id: number; name_th: string } | null>(null);
  const [amphure, setAmphure] = useState<{ id: number; name_th: string } | null>(null);
  const [amphureId, setAmphureId] = useState<AmphureDTO[] | null>(null);
  const [tambon, setTambon] = useState<{ id: number; name_th: string } | null>(null);
  const [tambonId, setTambonId] = useState<TambonDTO[] | null>(null);

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
  return (
    province?.name_th,
    amphure?.name_th,
    tambon?.name_th,
    (
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
    )
  );
}
