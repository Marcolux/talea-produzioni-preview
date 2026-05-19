class SharedLogic {
    public withPublicUrl = (p: string) => `${process.env.PUBLIC_URL}${p.startsWith('/') ? '' : '/'}${p}`
}

export const sharedLogic =  new SharedLogic