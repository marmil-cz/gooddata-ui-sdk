// (C) 2021-2022 GoodData Corporation

import React from "react";

import { IIconProps } from "../typings";

/**
 * @internal
 */
export const Expand: React.FC<IIconProps> = ({ className, width = 12, height = 13 }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 12 13"
            fill="none"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path
                d="M11.7012 0.597656H8.70117C8.61914 0.597656 8.54883 0.626953 8.49023 0.685547C8.43164 0.744141 8.40234 0.816406 8.40234 0.902344C8.40234 0.984375 8.43164 1.05469 8.49023 1.11328C8.54883 1.17188 8.61914 1.20117 8.70117 1.20117H10.9746L7.28906 4.88672C7.23047 4.94531 7.20117 5.01758 7.20117 5.10352C7.20117 5.18555 7.23047 5.25586 7.28906 5.31445C7.31641 5.3418 7.34766 5.36328 7.38281 5.37891C7.42188 5.39453 7.46094 5.40234 7.5 5.40234C7.53906 5.40234 7.57617 5.39453 7.61133 5.37891C7.65039 5.36328 7.68359 5.3418 7.71094 5.31445L11.4023 1.62305V3.90234C11.4023 3.98438 11.4316 4.05469 11.4902 4.11328C11.5488 4.17188 11.6191 4.20117 11.7012 4.20117C11.7832 4.20117 11.8535 4.17188 11.9121 4.11328C11.9707 4.05469 12 3.98438 12 3.90234V0.902344C12 0.816406 11.9707 0.744141 11.9121 0.685547C11.8535 0.626953 11.7832 0.597656 11.7012 0.597656ZM4.71094 7.88672C4.65234 7.82812 4.58203 7.79883 4.5 7.79883C4.41797 7.79883 4.34766 7.82812 4.28906 7.88672L0.597656 11.5781V9.29883C0.597656 9.2168 0.568359 9.14648 0.509766 9.08789C0.451172 9.0293 0.380859 9 0.298828 9C0.216797 9 0.146484 9.0293 0.0878906 9.08789C0.0292969 9.14648 0 9.2168 0 9.29883V12.2988C0 12.3809 0.0292969 12.4512 0.0878906 12.5098C0.146484 12.5684 0.216797 12.5977 0.298828 12.5977H3.29883C3.38086 12.5977 3.45117 12.5684 3.50977 12.5098C3.56836 12.4512 3.59766 12.3809 3.59766 12.2988C3.59766 12.2168 3.56836 12.1465 3.50977 12.0879C3.45117 12.0293 3.38086 12 3.29883 12H1.02539L4.71094 8.31445C4.76953 8.25586 4.79883 8.18555 4.79883 8.10352C4.79883 8.01758 4.76953 7.94531 4.71094 7.88672Z"
                fill="#464E56"
            />
        </svg>
    );
};