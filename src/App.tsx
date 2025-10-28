// src/App.tsx
import React, { useState } from 'react';
import {type SwCharacter, RACES, type Characteristic } from './data/SwData';
import { Layout, Row, Col, Card, Statistic, InputNumber, Divider, Tag } from 'antd';
import './App.css'; // You can remove the default styles and start fresh

const { Header, Content } = Layout;

// Helper function to calculate the Characteristic Bonus (Score / 6) - 2
const calculateBonus = (score: number): number => Math.floor(score / 6) - 2;

// --- INITIAL CHARACTER STATE ---
const initialCharacter: SwCharacter = {
    name: 'New Adventurer',
    race: RACES[0], // Start as Human
    level: 1,
    stats: {
        STR: 10, DEX: 10, AGI: 10, INT: 10, MEN: 10, VIT: 10,
    },
    classes: [{ name: 'Fighter', level: 1 }],
    maxLP: 15,
    currentLP: 15,
    maxMP: 5,
    currentMP: 5,
};

const App: React.FC = () => {
    const [character, setCharacter] = useState<SwCharacter>(initialCharacter);

    // Function to handle LP/MP changes
    const handleResourceChange = (resource: 'currentLP' | 'currentMP', value: number | null) => {
        if (value !== null) {
            setCharacter(prev => ({
                ...prev,
                [resource]: Math.min(value, prev[resource === 'currentLP' ? 'maxLP' : 'maxMP'])
            }));
        }
    };

    return (
        <Layout className="min-h-screen bg-gray-100">

            {/* --- HEADER & RESOURCE TRACKER --- */}
            <Header className="bg-white shadow-md p-4 sticky top-0 z-10 h-auto">
                <Row align="middle" justify="space-between">
                    <Col>
                        <h1 className="text-2xl font-bold m-0">{character.name} <Tag color="blue">{character.race?.name}</Tag></h1>
                        <p className="text-sm m-0">Level {character.level} | CP: 15 | Def: 10</p>
                    </Col>

                    <Col className="flex space-x-4">
                        <Statistic
                            title={`LP (${character.maxLP})`}
                            value={character.currentLP}
                            suffix={<InputNumber size="small" min={0} max={character.maxLP} value={character.currentLP} onChange={(v) => handleResourceChange('currentLP', v)} className="w-16" />}
                        />
                        <Statistic
                            title={`MP (${character.maxMP})`}
                            value={character.currentMP}
                            suffix={<InputNumber size="small" min={0} max={character.maxMP} value={character.currentMP} onChange={(v) => handleResourceChange('currentMP', v)} className="w-16" />}
                        />
                    </Col>
                </Row>
            </Header>

            {/* --- MAIN CONTENT AREA --- */}
            <Content className="p-8">
                <Row gutter={24}>

                    {/* --- LEFT COLUMN: COMBAT & CORE STATS --- */}
                    <Col span={16}>
                        <Card title="Characteristics & Combat" className="mb-6">
                            <Row gutter={16}>
                                {Object.keys(character.stats).map(key => {
                                    const statKey = key as Characteristic;
                                    const finalScore = character.stats[statKey] + (character.race?.statAdjustments[statKey] || 0);
                                    const bonus = calculateBonus(finalScore);
                                    return (
                                        <Col span={4} key={statKey}>
                                            <Statistic
                                                title={statKey}
                                                value={finalScore}
                                                suffix={<span className="text-sm text-gray-500">({bonus > 0 ? `+${bonus}` : bonus})</span>}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                            <Divider />
                            <Card type="inner" title="Classes">
                                {character.classes.map((cls, index) => (
                                    <p key={index} className="m-0">{cls.name} (Lv. {cls.level})</p>
                                ))}
                            </Card>
                        </Card>

                        <Card title="Skills & Abilities" className="mb-6">
                            <p>Implement skill listing here...</p>
                        </Card>
                    </Col>

                    {/* --- RIGHT COLUMN: RESOURCES & DETAILS --- */}
                    <Col span={8}>
                        <Card title="Equipped Gear" className="mb-6">
                            <p>Weapon: Bastard Sword</p>
                            <p>Armor: Plate Armor</p>
                            <p>Shield: Tower Shield</p>
                        </Card>
                        <Card title="Inventory & Notes">
                            <p>1500 Gil, Healing Potion x3</p>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};


export default App;