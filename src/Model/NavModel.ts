interface NavInterface
{
    isLoggedIn: boolean,
    role: string | undefined;
    AvatarSize: string;
}

interface NavSyntaxInterface {
    fontSize?: number;
    transition?: string;
    bgcolor?: string;
    color?: string;
    '&:hover'?: {
        color: string;
    };
}

interface MenuItemSyntaxInterface
{
    margin: number;
    padding: number;
}

interface ProfileMenuInterface extends NavInterface
{
    anchorElUser: HTMLElement | null;
    handleUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
    NavSyntax: NavSyntaxInterface;
    MenuItemSyntax: MenuItemSyntaxInterface;
}


interface NavMenuInterface extends NavInterface
{
    anchorElNav: HTMLElement | null;
    handleNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
    NavSyntax: NavSyntaxInterface;
    MenuItemSyntax: MenuItemSyntaxInterface;
}

export type {NavSyntaxInterface, MenuItemSyntaxInterface, ProfileMenuInterface, NavMenuInterface}