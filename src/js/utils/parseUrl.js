export default function () {
    const params = window.location.search.split('?');

    if(params.length > 1) {
        return params[1].split('&').reduce((acc, curValue) => {
            const param = curValue.split('=');

            if (param.length > 1) {
                acc[param[0]] = param[1].split(',');
            }
            return acc;
        }, {});
    }
}