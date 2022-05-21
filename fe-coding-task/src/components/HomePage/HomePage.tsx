import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ThemeProvider, TextField, createTheme} from "@mui/material";
import {Autocomplete } from "@mui/material";

import Chart from "../charts/Chart";
import {getData} from "../../service/service"
import {marks, options} from "../Marks"
import "./HomePage.css"

const theme = createTheme({});
type Option = {
    label: string;
    value: string;
};
type FormValues = {
    start?: string;
    end?: string;
    type?: string;
};

export default function App() {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [chartData, setChartData] = useState()

    const [params] = useState(
        {
            start: searchParams.get("start") ? searchParams.get("start") : "",
            end: searchParams.get("end") ? searchParams.get("end") : "",
            type: searchParams.get("type") ? searchParams.get("type") : ""
        }
    )
    const {
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<FormValues>({
            defaultValues: {
                start: searchParams.get("start") ? String(searchParams.get("start")) : "",
                end: searchParams.get("end") ? String(searchParams.get("end")) : "",
                type: searchParams.get("type") ? String(searchParams.get("type")) : ""
            }
        }
    );
    useEffect(() => {
        let start = searchParams.get("start")
        let end = searchParams.get("end")
        let type = searchParams.get("type")
        if (start && end && type) {
            getData({start, end, type}).then((data: any) => {
                setChartData(data)
            });
        }
    }, [])


    const onSubmit = handleSubmit((data) => {
        if (Object.keys(data).length !== 0) {
            navigate({
                search: `?start=${data.start}&end=${data.end}&type=${data.type}`,
            });
            getData(data).then((data: any) => {
                setChartData(data)
            });
        }
    })
    return (
        <div className="container">
            <ThemeProvider theme={theme}>
                <h1>KOIASOFT</h1>
                <form className="form" onSubmit={onSubmit}>
                    <section>
                        <label>Start Date </label>
                        <Autocomplete
                            options={marks}
                            defaultValue={{value: String(params.start), label: String(params.start)}}
                            getOptionLabel={(option: Option) => option.label}
                            onChange={(e: any, marks: any) => {
                                sessionStorage.setItem('start', marks?.label ? marks?.label : "");
                                setValue("start", marks?.label)
                            }
                            }
                            renderInput={(params: any) => (
                                <TextField
                                    {...params}
                                    error={Boolean(errors?.start)}
                                    helperText={errors?.start?.message}
                                />
                            )}
                        />
                    </section>

                    <section>
                        <label>End Date</label>
                        <Autocomplete
                            options={marks}
                            defaultValue={{value: String(params.end), label: String(params.end)}}
                            getOptionLabel={(option: Option) => option.label}
                            onChange={(e: any, marks: any) => {
                                sessionStorage.setItem('end', marks?.label ? marks?.label : "");
                                setValue("end", marks?.label)
                            }
                            }
                            renderInput={(params: any) => (
                                <TextField
                                    {...params}
                                    error={Boolean(errors?.end)}
                                    helperText={errors?.end?.message}
                                />
                            )}
                        />
                    </section>
                    <section>
                        <label>Home Type</label>
                        <Autocomplete
                            options={options}
                            defaultValue={{
                                value: String(params.type),
                                label: String(options.find((item) => item.value === params.type)?.label||'')
                            }}
                            getOptionLabel={(option: Option) => option.label}
                            onChange={(e: any, options: any) => {
                                sessionStorage.setItem('type', options?.value ? options?.value : "");
                                setValue("type", options?.value)
                            }
                            }
                            renderInput={(params: any) => (
                                <TextField
                                    {...params}
                                    error={Boolean(errors?.type)}
                                    helperText={errors?.type?.message}
                                />
                            )}
                        />
                    </section>

                    <input type="submit" className="button"/>
                </form>
            </ThemeProvider>
            {chartData && <Chart data={chartData}/>}
        </div>
    );
}