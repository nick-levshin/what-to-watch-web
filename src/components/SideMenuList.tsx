import { queryState } from '@/atoms/detailsAtom';
import useDebouncedFunction from '@/hooks/useDebounced';
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  Slider,
} from '@mui/material';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const SideMenuList = () => {
  const yearMarks = [
    { value: 1950, label: '1950' },
    { value: 1980, label: '1980' },
    { value: 2000, label: '2000' },
    { value: 2030, label: '2030' },
  ];
  const ratingMarks = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ];
  const [query, setQuery] = useRecoilState(queryState);
  const [year, setYear] = useState([1950, 2030]);
  const [rating, setRating] = useState([1, 10]);
  const debouncedValueYear = useDebouncedFunction(handleQueryYear, 300);
  const debouncedValueRating = useDebouncedFunction(handleQueryRating, 300);

  function handleQueryYear(value: number | number[]) {
    setQuery({ ...query, year: value as number[] });
  }

  const handleYear = (_: Event, newValue: number | number[]) => {
    setYear(newValue as number[]);
    debouncedValueYear(newValue);
  };

  function handleQueryRating(value: number | number[]) {
    setQuery({ ...query, rating: value as number[] });
  }

  const handleRating = (_: Event, newValue: number | number[]) => {
    setRating(newValue as number[]);
    debouncedValueRating(newValue);
  };

  return (
    <Box
      role="presentation"
      className=" h-full bg-black text-white w-[255px] md:w-[300px]"
    >
      <h2 className="text-center mt-4 text-2xl font-bold md:text-3xl">
        Фильтры
      </h2>
      <List className="text-center">
        <FormControl className="p-2" fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            className="bg-black text-gray-400 p-2"
          >
            Сортировка
          </InputLabel>
          <Select
            className="text-white"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={query?.sort}
            label="Sort"
            onChange={(e) =>
              setQuery({ ...query, sort: e.target.value as string })
            }
            defaultValue={'base'}
          >
            <MenuItem value={'base'}>Рекомендуемые</MenuItem>
            <MenuItem value={'rating.kp'}>По рейтингу</MenuItem>
            <MenuItem value={'year'}>По году</MenuItem>
            <MenuItem value={'votes.await'}>По ожиданиям</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="p-2 mt-2" fullWidth>
          <InputLabel
            id="demo-simple-select-label-type"
            className="bg-black text-gray-400 p-2"
          >
            Тип
          </InputLabel>
          <Select
            className="text-white"
            labelId="demo-simple-select-label-type"
            id="demo-simple-select-type"
            value={query?.type}
            label="Type"
            onChange={(e) =>
              setQuery({ ...query, type: e.target.value as string })
            }
            defaultValue={'base'}
          >
            <MenuItem value={'base'}>Все типы</MenuItem>
            <MenuItem value={'movie'}>Фильмы</MenuItem>
            <MenuItem value={'tv-series'}>Сериалы</MenuItem>
            <MenuItem value={'cartoon'}>Мультфильмы</MenuItem>
            <MenuItem value={'animated-series'}>Мультсериалы</MenuItem>
            <MenuItem value={'anime'}>Аниме</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="p-2 mt-2" fullWidth>
          <InputLabel
            id="demo-simple-select-label-genre"
            className="bg-black text-gray-400 p-2"
          >
            Жанр
          </InputLabel>
          <Select
            className="text-white"
            labelId="demo-simple-select-label-genre"
            id="demo-simple-select-genre"
            value={query?.genre}
            label="Genre"
            onChange={(e) =>
              setQuery({ ...query, genre: e.target.value as string })
            }
            defaultValue={'base'}
          >
            <MenuItem value={'base'}>Все жанры</MenuItem>
            <MenuItem value={'боевик'}>Боевики</MenuItem>
            <MenuItem value={'биография'}>Биографии</MenuItem>
            <MenuItem value={'детектив'}>Детективы</MenuItem>
            <MenuItem value={'документальный'}>Документальные</MenuItem>
            <MenuItem value={'драма'}>Драмы</MenuItem>
            <MenuItem value={'комедия'}>Комедии</MenuItem>
            <MenuItem value={'мюзикл'}>Мюзиклы</MenuItem>
            <MenuItem value={'триллер'}>Триллеры</MenuItem>
            <MenuItem value={'ужасы'}>Ужасы</MenuItem>
            <MenuItem value={'фантастика'}>Фантастика</MenuItem>
          </Select>
        </FormControl>
      </List>
      <Divider className="bg-white my-4" />
      <List>
        <Box className="text-center w-[250px] md:w-[300px]">
          <h3 className="text-left pl-2 font-semibold">Годы выпуска:</h3>
          <Slider
            className="mt-2 w-[210px] md:w-[260] text-[#dc2626]"
            getAriaLabel={() => 'Year range'}
            value={year}
            min={1950}
            max={2030}
            marks={yearMarks}
            onChange={handleYear}
            valueLabelDisplay="auto"
          />
        </Box>
        <Box className="text-center w-[250px] md:w-[300px]">
          <h3 className="text-left pl-2 font-semibold">Рейтинг:</h3>
          <Slider
            className="mt-2 w-[210px] md:w-[260] text-[#dc2626]"
            getAriaLabel={() => 'Rating range'}
            value={rating}
            min={1}
            max={10}
            marks={ratingMarks}
            onChange={handleRating}
            valueLabelDisplay="auto"
          />
        </Box>
      </List>
    </Box>
  );
};

export default SideMenuList;
