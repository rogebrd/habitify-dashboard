import { FunctionComponent, useEffect, useState } from "react"
import { Card } from "../common/card"
import "../../styles/habitify.scss";
import { LinearProgress, CircularProgress, ThemeProvider, Input } from "@material-ui/core";
import { materialUITheme } from "../common/materialUITheme";
import { DAYS_SHORTHAND, MONTH_SHORTHAND } from "../../constants";
import { getUrlDateForMonthlyProgress, getUrlDatesForDailyProgress, getUrlDatesForWeeklyProgress, getUrlIndexFromDay, getWeekNumbersForWeeklyProgress } from "../../util/date";
import { client, setAuthHeader } from "../../data/axios";

function useLocalStorageState<T>(
    key: string,
    defaultValue: T
  ): [T, (newVal: T) => void] {
    /*
    Similar to useState, except the state is updated to local storage so that it's not lost between refreshes.
     */
    // @ts-ignore
    const storedValue = JSON.parse(localStorage.getItem(key));
    const setVal = (v: T) => {
      localStorage.setItem(key, JSON.stringify(v));
        _setVal(v);
    };
    const [val, _setVal] = useState<T>(storedValue ?? defaultValue);

    return [val, setVal];
  }

export const HabitifyWidget: FunctionComponent = () => {
    const [dailyProgress, setDailyProgress] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
    const [weeklyProgress, setWeeklyProgress] = useState<number[]>([0, 0, 0, 0]);
    const [monthlyProgress, setMonthlyProgress] = useState<number>(0);
    const [token, setToken] = useLocalStorageState<string>('habitify_token', '');
    const [failedRequest, setFailedRequest] = useState<boolean>(false);

    const today = new Date();

    useEffect(() => {
        setAuthHeader(token);
        fetchDailyProgress();
        fetchWeeklyProgress();
        fetchMonthlyProgress();
    }, [token]);

    const fetchDailyProgress = () => {
        let dailyProgressHolder = [0, 0, 0, 0, 0, 0, 0];
        Promise.allSettled(getUrlDatesForDailyProgress().map((date) => client.get(getJournalUrl(date))))
        .then((responses) => {
            responses.map((response: any) => {
                if(response.status.toString() === 'fulfilled') {
                    const value = parseResponse(response.value, "daily")
                    const requestUrl: string = response.value.request.responseURL;
                    
                    dailyProgressHolder[getUrlIndexFromDay(new Date(requestUrl.substring(44, 54)).getDay())] = value;
                } else {
                    setFailedRequest(true);
                }
                
            })
            setDailyProgress(dailyProgressHolder);
        })
        .catch((error) => console.error(error));
    }

    const fetchWeeklyProgress = () => {
        let weeklyProgressHolder = [0, 0, 0, 0];
        Promise.allSettled(getUrlDatesForWeeklyProgress().map((date) => client.get(getJournalUrl(date))))
        .then((responses) => {
            responses.map((response: any) => {
                if(response.status.toString() === 'fulfilled') {
                    const value = parseResponse(response.value, "weekly")
                    const requestUrl: string = response.value.request.responseURL;
                    
                    weeklyProgressHolder[getUrlIndexFromDay(new Date(requestUrl.substring(44, 54)).getDay())] = value;
                } else {
                    setFailedRequest(true);
                }
                
            })
            setWeeklyProgress(weeklyProgressHolder);
        })
        .catch((error) => console.error(error));
    }

    const fetchMonthlyProgress = () => {
        client.get(getJournalUrl(getUrlDateForMonthlyProgress()))
        .then((response) => {
            const value = parseResponse(response, "monthly")
            setMonthlyProgress(value);
        })
        .catch((error) => console.error(error));
    }

    const getJournalUrl = (urlDate: string) => `journal?target_date=${urlDate}`;

    const parseResponse: any = (response: any, fetch_type: string) => {
        if(response.data.message === "Success") {
            let dailyComplete = 0;
            let dailyGoal = 0;
            response.data.data.map((habit: any) => {
                const periodicity = habit.goal.periodicity;
                const complete = Number.parseFloat(habit.progress.current_value);
                const goal = Number.parseFloat(habit.progress.target_value);
                switch(periodicity){
                    case fetch_type:
                        dailyComplete += (complete > goal ? goal : complete);
                        dailyGoal += goal;
                }
            })
            return ((dailyComplete / dailyGoal) * 100);
        } else {
            return 0;
        }
    }

    const renderDay = (index: number, progress: number) => (
        <Card className={getUrlIndexFromDay(today.getDay()) == index ? "current" : ""}>
            <h3 className="habitify__label">
                {DAYS_SHORTHAND[index]}
            </h3>
            <span className="habitify__day">
                <p className="habitify__day--progress">
                    {progress.toFixed(1)}%
                </p>
                <span className="habitify__day--wheel">
                    <CircularProgress 
                        variant="determinate" 
                        value={progress} 
                        thickness={6}
                        size={"100px"}
                    />
                </span>
            </span>
        </Card>
    );

    const renderWeek = (index: number, progress: number) => (
        <Card className={index == 3 ? "current" : ""}>
            <h3 className="habitify__label">
                W{getWeekNumbersForWeeklyProgress()[index]}
            </h3>
            <span>
                {progress.toFixed(1)}%
            </span>
            <LinearProgress variant="determinate" value={progress} />
        </Card>
    )

    const renderMonth = () => (
        <Card className="current">
            <h3 className="habitify__label">
                {MONTH_SHORTHAND[today.getMonth()]}
            </h3>
            <span>
                {monthlyProgress.toFixed(1)}%
            </span>
            <LinearProgress variant="determinate" value={monthlyProgress} />
        </Card>
    )

    return (
        <ThemeProvider theme={materialUITheme}>
            <h1 className="habitify__title">
                Habitify Habit Visualizer
            </h1>
            <div className="habitify__token">
                <Card>
                    { failedRequest ? (<p>failure</p>) : null}
                    <Input onChange={(change) => setToken(change.target.value)} value={token} />
                </Card>
            </div>
            <div className="habitify">
                <div className="habitify__row">
                    {
                        DAYS_SHORTHAND.map((day, index) => (
                            renderDay(index, dailyProgress[index])
                        ))
                    }
                </div>
                <div className="habitify__row">
                    {
                        weeklyProgress.map((progress, index) => (
                            renderWeek(index, progress)
                        ))
                    }
                </div>
                <div className="habitify__row">
                    {renderMonth()}
                </div>
            </div>
        </ThemeProvider>
    )
}