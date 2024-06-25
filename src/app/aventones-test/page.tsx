"use client"
import styles from "./test.module.css";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import RiderCRUD from "../components/riderCRUD/riderCRUD.jsx";
import DriverCRUD from "../components/driverCRUD/driverCRUD.jsx";
import BookingCRUD from "../components/bookingCRUD/bookingCRUD.jsx";
import { Card, CardBody } from "@nextui-org/react";

export default function BackendTest() {
    const [crud, setCrud] = React.useState("");

    const crudList = [
        { key: "driver", label: "Driver" },
        { key: "rider", label: "Rider" },
        { key: "booking", label: "Booking" }
        // { key: "vehicle", label: "Vehicle" }
    ];
    const handleSelect = () => {
        switchCrud();
    }
    const switchCrud = () => {
        switch (crud) {
            case "driver":
                return <DriverCRUD />;
            case "rider":
                return <RiderCRUD />;
            case "booking":
                return <BookingCRUD />;
            // case "vehicle":
            //     return <VehicleCRUD />;
            default:
                return <div>
                    <Card>
                        <CardBody>
                            <p>Please select a CRUD to start</p>
                        </CardBody>
                    </Card>
                </div>;
        }
    }

    return (
        <div className={styles.testMain}>
            <h1 className={styles.h1Title}>Aventones Front/Back-end Test July 25th</h1>
            <Card>
                <CardBody>
                    <p>This Website is on active development, expect changes.</p>
                </CardBody>
            </Card>
            <br />
            <Select
                label="CRUD"
                className="max-w-xs"
                variant="bordered"
                color="secondary"
                onChange={(e) => {
                    setCrud(e.target.value)
                    handleSelect()
                }}
            >
                {crudList.map((crud) => (
                    <SelectItem key={crud.key}>
                        {crud.label}
                    </SelectItem>
                ))}
            </Select>
            <br />
            {switchCrud()}
        </div>
    );
}
