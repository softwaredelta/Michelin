import { Dropdown, Navbar } from "flowbite-react";
import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";
import { NavbarBrand } from "flowbite-react/lib/esm/components/Navbar/NavbarBrand";
import { NavbarCollapse } from "flowbite-react/lib/esm/components/Navbar/NavbarCollapse";
import { NavbarLink } from "flowbite-react/lib/esm/components/Navbar/NavbarLink";
const NavBar = () => {
  return (
    <>
      <div>
        <Navbar className="border-b-2" fluid={true} rounded={true}>
          <NavbarBrand className="px-4" href="">
            <img
              style={({ width: "100px" }, { height: "60px" })}
              src="https://logos-download.com/wp-content/uploads/2016/03/Michelin_brand_Logo_2017.png"
              alt="Michelin Logo"
            />
          </NavbarBrand>
          <NavbarCollapse className="px-2">
            <NavbarLink className="text-lg font-semibold !text-blues-100 hover:!text-gray-500">Historial</NavbarLink>
            <NavbarLink className="text-lg font-semibold !text-blues-100 hover:!text-gray-500">Métricas</NavbarLink>
            <NavbarLink className="text-lg font-semibold !text-blues-100 hover:!text-gray-500">Cuestionarios</NavbarLink>
            <NavbarLink className="text-lg font-semibold !text-blues-100 hover:!text-gray-500">
              <div className="flex md:order-2 text-lg">
                <Dropdown
                  arrowIcon={true}
                  inline={true}
                  className="!text-lg"
                  label="Administración"
                >
                  <DropdownItem className="font-semibold !text-blues-100 hover:!text-gray-500">Puntos de Venta</DropdownItem>
                  <DropdownItem className="font-semibold !text-blues-100 hover:!text-gray-500">Equipos</DropdownItem>
                  <DropdownItem className="font-semibold !text-blues-100 hover:!text-gray-500">Usuario</DropdownItem>
                </Dropdown>
              </div>
            </NavbarLink>
            <NavbarLink className="text-lg font-semibold !text-blues-100 hover:!text-gray-500">Cuenta</NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
