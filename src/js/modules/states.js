
export default function states(state = 'main',what){


    if (what == 'set') { sessionStorage['state'] = state; return 200; }
    if (what == 'get') return sessionStorage['state'] === state;

}