interface NavInterface
{
    isLoggedIn: boolean,
    role: string | undefined;
    AvatarSize: string;
}

export interface NavSyntaxInterface {
    fontSize?: number;
    transition?: string;
    bgcolor?: string;
    color?: string;
    '&:hover'?: {
        color: string;
    };
}


export interface MenuItemSyntaxInterface
{
    m: number;
    p: number;
}

export interface ProfileMenuInterface extends NavInterface
{
    anchorElUser: HTMLElement | null;
    handleUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
    NavSyntax: NavSyntaxInterface;
    MenuItemSyntax: MenuItemSyntaxInterface;
}


export interface NavMenuInterface extends NavInterface
{
    anchorElNav: HTMLElement | null;
    handleNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
    NavSyntax: NavSyntaxInterface;
    MenuItemSyntax: MenuItemSyntaxInterface;
}
