const localStorage = window.localStorage;

export const onChangeInput = (e: any, setter: Function) => {
    setter(e.target.value);
}

export const onRegister = (e: any, email: string, navigate: any) => {
    e.preventDefault();
    if (email.length < 3) {
        console.log("Please enter valid email")
        return
    }
    if (localStorage.getItem(email) == null) {
       
        localStorage.setItem(email, JSON.stringify({
            "email": email,
            "questions": [],
            "isDone": false,
            "examId": -1,
            
        }));
        navigate(`/exam/`)
    } else {
        if (JSON.parse(localStorage.getItem(email ? email : 'unknown') as string).isDone) {
            navigate(`/exam/attempts/`)
        }
        navigate(`/exam/`)
    }
}

