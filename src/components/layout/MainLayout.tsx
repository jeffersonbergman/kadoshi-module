
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarFooter,
  SidebarProvider
} from '@/components/ui/sidebar';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  Users, 
  Music, 
  Settings, 
  LogOut,
  Calendar
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme, setTheme, language, setLanguage } = useApp();
  const navigate = useNavigate();

  const menuItems = [
    { 
      title: 'Início', 
      icon: Home, 
      url: '/',
      onClick: () => navigate('/')
    },
    { 
      title: 'Financeiro', 
      icon: DollarSign, 
      url: '/financeiro',
      onClick: () => navigate('/financeiro')
    },
    { 
      title: 'Administrativo', 
      icon: Users, 
      url: '/administrativo',
      onClick: () => navigate('/administrativo')
    },
    { 
      title: 'Calendário', 
      icon: Calendar, 
      url: '/administrativo/calendario',
      onClick: () => navigate('/administrativo/calendario')
    },
    { 
      title: 'Música', 
      icon: Music, 
      url: '/musica',
      onClick: () => navigate('/musica')
    },
    { 
      title: 'Configurações', 
      icon: Settings, 
      url: '/configuracoes',
      onClick: () => navigate('/configuracoes')
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar variant="floating" className="border-r border-border/10">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="font-heading text-lg text-primary">Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        onClick={item.onClick}
                        tooltip={item.title}
                        className="hover:bg-accent/50 active:bg-accent/70 group"
                      >
                        <item.icon className="mr-2 h-5 w-5 text-primary group-hover:text-primary/80" />
                        <span className="font-medium">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate('/login')}
                  className="text-destructive hover:bg-destructive/10 active:bg-destructive/20 group"
                >
                  <LogOut className="mr-2 h-5 w-5 group-hover:text-destructive/80" />
                  <span className="font-medium">Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
