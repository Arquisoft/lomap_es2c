import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ImgCarrusel from 'components/mainComponents/ImgCarrusel';

test('renders img carrusel', () => {
    render(
        <ImgCarrusel />
    );
    let linkElement = screen.getByTestId("imgCarruselComp");
    expect(linkElement).toBeInTheDocument();
});

test('renders click on img view button', () => {
    render(
        <ImgCarrusel />
    );
    let linkElement = screen.getByTestId("imgCarruselComp");
    expect(linkElement).toBeInTheDocument();
    let button = screen.getByTestId("imgButton1");
    fireEvent.click(button);
    linkElement = screen.getByTestId("carruselImg");
    expect(linkElement).toBeInTheDocument();
});