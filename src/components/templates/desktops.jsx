import { useDesktops } from "@/utils/store/desktop";
import Desktop from "../organisms/desktop";

export default function Desktops({ terminal }) {
    const {
        currentDesktop,
        desktops
    } = useDesktops();

    return (
        <div>
            {
                desktops.map((desktop, index) => {
                    return (
                        <Desktop terminal={terminal} key={index} desktop={desktop} />
                    )
                })
            }
        </div>
    )
}