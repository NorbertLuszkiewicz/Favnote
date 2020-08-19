import React from 'react';
import { storiesOf } from '@storybook/react';
import Textarea from './Textarea';

storiesOf('Atoms/Textarea', module).add('Normal', () => <Textarea placeholder="description" />);
