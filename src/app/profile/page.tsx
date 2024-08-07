'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../AuthContext';
import styles from './profile.module.css';
import { Chip, Card, CardHeader, CardBody, CardFooter, Input, Button, Divider, Spinner, Checkbox, Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, useDisclosure, Tooltip, input } from "@nextui-org/react";
import { toast, ToastContainer } from 'react-toastify';
import { useTheme } from 'next-themes';

const ProfilePage: React.FC = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { theme } = useTheme();
    const [isReadOnly, setisReadOnly] = React.useState(true);
    const [phone, setPhone] = useState(Number);
    const [seats, setSeats] = useState(Number);
    const [year, setYear] = useState(Number);
    const [profilePic, setprofilePic] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [model, setModel] = useState('');
    const [plate, setPlate] = useState('');
    const [make, setMake] = useState('');
    const [role, setRole] = useState('');
    const { tokenExists } = useAuth();
    const router = useRouter();

    const uploadImg = async (file: File) => {
        const base64: string = await convert64(file);

        if (base64.length > 2097152) {
            toast('The selected Image is larger than 1.5MB!', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'error',
                theme: theme,
                position: 'top-left'
            });
        }
        else {
            setprofilePic(base64);
            console.log(base64);
            toast('Image uploaded succesfully!', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'success',
                theme: theme,
                position: 'top-left'
            });
        }
    }
    const convert64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    }

    const toastOK = () =>
        toast('Your profile has been updated succesfully!', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
            theme: theme,
            position: 'top-left'
        });
    const toastNOK = () =>
        toast('Error while updating!', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'error',
            theme: theme,
            position: 'top-left'
        });

    const handleClick = () => {
        let user;
        if (role === 'Rider') {
            const rider = {
                first_name: fname,
                last_name: lname,
                email: email,
                phone: phone,
                profilePicture: profilePic
            };
            user = rider;
        }
        else {
            const driver = {
                first_name: fname,
                last_name: lname,
                email: email,
                phone: phone,
                model: model,
                plate: plate,
                year: year,
                make: make,
                seats: seats,
                profilePicture: profilePic
            };
            user = driver;
        }
        updateProfile(user);
    }

    const getToken = () => {
        const tokenRow = document.cookie.split(';').find((row) => row.trim().startsWith('token='));
        if (tokenRow) {
            return tokenRow.split('=')[1];
        }
        return null;
    }

    const updateProfile = async (user: any) => {
        const token = getToken();
        const response = await fetch('http://127.0.0.1:3001/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            localStorage.setItem('profilePic', profilePic);
            toastOK();
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.reload();
        }
        else {
            toastNOK();
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = getToken();
                const response = await fetch('http://127.0.0.1:3001/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setFname(data.first_name);
                    setLname(data.last_name);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setModel(data.model);
                    setPlate(data.plate);
                    setYear(data.year);
                    setMake(data.make);
                    setSeats(data.seats);
                    setRole(data.role);
                } else {
                    console.error('Failed to fetch user data');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error:', error);
                router.push('/login');
            }
        };

        if (tokenExists) {
            fetchUserData();
        } else {
            router.push('/login');
        }
    }, [tokenExists, router]);

    if (!role) return <div className={styles.spinnerContainer}> <Spinner label="Loading..." color="secondary" /></div>;

    return (
        <div className={styles.main}>
            <Card className="min-w-[35%]">
                <CardHeader className="flex gap-3">
                    <h1 className='text-3xl font-bold'>My Profile</h1>
                </CardHeader>
                <Divider />
                <CardBody>
                    {role === 'Rider' ? (
                        <>
                            <Input type="text" variant="bordered" color="secondary" label="First Name" value={fname} isReadOnly={isReadOnly} onChange={(e) => setFname(e.target.value)} /><br />
                            <Input type="text" variant="bordered" color="secondary" label="Last Name" value={lname} isReadOnly={isReadOnly} onChange={(e) => setLname(e.target.value)} /><br />
                            <Input type="email" variant="bordered" color="secondary" label="Email" value={email} isReadOnly={isReadOnly} onChange={(e) => setEmail(e.target.value)} /><br />
                            <Input type="number" variant="bordered" color="secondary" label="Phone" value={phone.toString()} isReadOnly={isReadOnly} onChange={(e) => setPhone(Number(e.target.value))} /><br />
                            <Tooltip color="danger" content="Role cannot be changed, please create a Driver Account">
                                <Input type="text" variant="bordered" color="secondary" label="Role" value={role} isReadOnly={true} onChange={(e) => setRole(e.target.value)} />
                            </Tooltip>
                            <br />
                            <input type="file" accept='.jpg, .png, .jpeg' color="secondary" disabled={isReadOnly} onChange={(e) => e.target.files && uploadImg(e.target.files[0])} />
                            <br />
                            <Chip variant='bordered' color="danger">1.5MB Max per image</Chip>
                            <br />
                        </>) : (
                        <>
                            <Input type="text" variant="bordered" color="secondary" label="First Name" value={fname} isReadOnly={isReadOnly} onChange={(e) => setFname(e.target.value)} /><br />
                            <Input type="text" variant="bordered" color="secondary" label="Last Name" value={lname} isReadOnly={isReadOnly} onChange={(e) => setLname(e.target.value)} /><br />
                            <Input type="email" variant="bordered" color="secondary" label="Email" value={email} isReadOnly={isReadOnly} onChange={(e) => setEmail(e.target.value)} /><br />
                            <Input type="number" variant="bordered" color="secondary" label="Phone" value={phone.toString()} isReadOnly={isReadOnly} onChange={(e) => setPhone(Number(e.target.value))} /><br />
                            <Tooltip color="danger" content="Role cannot be changed, please create a Driver Account">
                                <Input type="text" variant="bordered" color="secondary" label="Role" value={role} isReadOnly={true} />
                            </Tooltip>
                            <br />
                            <input type="file" accept='.jpg, .png, .jpeg' color="secondary" disabled={isReadOnly} onChange={(e) => e.target.files && uploadImg(e.target.files[0])} />
                            <br />
                            <Chip variant='bordered' color="danger">1.5MB Max per image</Chip>
                            <br />
                            <Card>
                                <CardBody>
                                    <p>Car Details</p>
                                </CardBody>
                            </Card>
                            <br />
                            <Input type="text" variant="bordered" color="secondary" label="Make" value={make} isReadOnly={isReadOnly} onChange={(e) => setMake(e.target.value)} /><br />
                            <Input type="text" variant="bordered" color="secondary" label="Model" value={model} isReadOnly={isReadOnly} onChange={(e) => setModel(e.target.value)} /><br />
                            <Input type="Number" variant="bordered" color="secondary" label="Year" value={year.toString()} isReadOnly={isReadOnly} onChange={(e) => setYear(Number(e.target.value))} /><br />
                            <Input type="Number" variant="bordered" color="secondary" min="1" label="Seats" value={seats.toString()} isReadOnly={isReadOnly} onChange={(e) => setSeats(Number(e.target.value))} /><br />
                        </>)}
                </CardBody>
                <Divider />
                <CardFooter>
                    <div className={styles.editCheckbox}>
                        <div className="flex gap-1">
                            <Checkbox isSelected={!isReadOnly} color="warning" onValueChange={() => setisReadOnly(!isReadOnly)}>
                                Allow Editing
                            </Checkbox>
                        </div>
                        <div className="flex gap-1">
                            <Button variant="ghost" isDisabled={isReadOnly} color="danger" onPress={() => router.push('/')}>Cancel</Button>
                            <Button variant="ghost" isDisabled={isReadOnly} color="secondary" onPress={onOpen}>Save</Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
            <Modal isOpen={isOpen} backdrop='blur' placement='center' onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to edit your profile?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" variant="ghost" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="danger" variant="ghost" onPress={() => { handleClick(); onClose() }}>
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default ProfilePage;
