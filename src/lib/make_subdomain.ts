
export default function make_subdomain(subdomain) {
    const { host, protocol } = window.location
    return `${protocol}//${subdomain}.${host}`;
}


