import { useState } from "react";
import {
    Alert,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const studySpaces = [
    {
        id: "1",
        name: "Central Library",
        type: "Library",
        location: "Main Building",
        capacity: 120,
        availableSeats: 35,
        openTime: "7:00 AM - 9:00 PM",
    },
    {
        id: "2",
        name: "Computer Lab",
        type: "Computer Lab",
        location: "IT Building",
        capacity: 40,
        availableSeats: 12,
        openTime: "8:00 AM - 8:00 PM",
    },
    {
        id: "3",
        name: "Study Room A",
        type: "Study Room",
        location: "Student Center",
        capacity: 10,
        availableSeats: 4,
        openTime: "8:00 AM - 10:00 PM",
    },
    {
        id: "4",
        name: "Quiet Reading Hall",
        type: "Reading Hall",
        location: "Library - 1st Floor",
        capacity: 60,
        availableSeats: 18,
        openTime: "7:00 AM - 9:00 PM",
    },
    {
        id: "5",
        name: "Cafeteria Study Area",
        type: "Cafeteria",
        location: "Cafeteria Building",
        capacity: 30,
        availableSeats: 15,
        openTime: "7:30 AM - 7:00 PM",
    },
];

const categories = [
    "All",
    "Library",
    "Computer Lab",
    "Study Room",
    "Reading Hall",
    "Cafeteria",
];

export default function App() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredSpaces = studySpaces.filter((space) => {
        const matchesSearch =
            space.name.toLowerCase().includes(search.toLowerCase()) ||
            space.location.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            space.type === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const studyHere = (space: any) => {
        if (space.availableSeats === 0) {
            Alert.alert(
                "Unavailable",
                "There are no available seats."
            );
            return;
        }

        Alert.alert(
            "Study Space Selected",
            `You selected ${space.name}.\n\nAvailable seats: ${space.availableSeats}`
        );
    };

    const renderSpace = ({ item }: any) => (
        <View style={styles.card}>

            <View style={styles.cardHeader}>

                <View style={styles.iconBox}>
                    <Text style={styles.icon}>📚</Text>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.spaceName}>
                        {item.name}
                    </Text>

                    <Text style={styles.type}>
                        {item.type}
                    </Text>
                </View>

            </View>

            <Text style={styles.info}>
                📍 {item.location}
            </Text>

            <Text style={styles.info}>
                👥 Capacity: {item.capacity}
            </Text>

            <Text style={styles.info}>
                🪑 Available Seats: {item.availableSeats}
            </Text>

            <Text style={styles.info}>
                🕐 {item.openTime}
            </Text>

            <View style={styles.bottomRow}>

                <View
                    style={[
                        styles.status,
                        item.availableSeats > 0
                            ? styles.available
                            : styles.unavailable,
                    ]}
                >
                    <Text style={styles.statusText}>
                        {item.availableSeats > 0
                            ? "Available"
                            : "Full"}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        item.availableSeats === 0 &&
                        styles.disabledButton,
                    ]}
                    onPress={() => studyHere(item)}
                >
                    <Text style={styles.buttonText}>
                        {item.availableSeats > 0
                            ? "Study Here"
                            : "Full"}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle="dark-content" />

            {/* Header */}

            <View style={styles.header}>

                <Text style={styles.appTitle}>
                    Campus Study Finder
                </Text>

                <Text style={styles.subtitle}>
                    Find the perfect place to study on campus
                </Text>

            </View>

            {/* Search */}

            <View style={styles.searchBox}>

                <Text style={styles.searchIcon}>
                    🔍
                </Text>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search study spaces..."
                    placeholderTextColor="#888"
                    value={search}
                    onChangeText={setSearch}
                />

            </View>

            {/* Categories */}

            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                style={styles.categoryList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.category,
                            selectedCategory === item &&
                            styles.selectedCategory,
                        ]}
                        onPress={() =>
                            setSelectedCategory(item)
                        }
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === item &&
                                styles.selectedCategoryText,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {/* Results */}

            <View style={styles.resultHeader}>

                <Text style={styles.resultTitle}>
                    Study Spaces
                </Text>

                <Text style={styles.resultCount}>
                    {filteredSpaces.length} found
                </Text>

            </View>

            {/* Study Spaces */}

            <FlatList
                data={filteredSpaces}
                renderItem={renderSpace}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>

                        <Text style={styles.emptyIcon}>
                            🔎
                        </Text>

                        <Text style={styles.emptyTitle}>
                            No study spaces found
                        </Text>

                        <Text style={styles.emptyText}>
                            Try another search or category.
                        </Text>

                    </View>
                }
            />

            {/* Bottom Navigation */}

            <View style={styles.bottomNav}>

                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>
                        🏠
                    </Text>

                    <Text style={styles.activeNavText}>
                        Home
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>
                        📍
                    </Text>

                    <Text style={styles.navText}>
                        Map
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>
                        ⭐
                    </Text>

                    <Text style={styles.navText}>
                        Favorites
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Text style={styles.navIcon}>
                        👤
                    </Text>

                    <Text style={styles.navText}>
                        Profile
                    </Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
    },

    appTitle: {
        fontSize: 27,
        fontWeight: "bold",
        color: "#1F2937",
    },

    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 5,
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        marginHorizontal: 20,
        paddingHorizontal: 15,
        borderRadius: 12,
        height: 50,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    searchIcon: {
        fontSize: 18,
        marginRight: 10,
    },

    searchInput: {
        flex: 1,
        fontSize: 15,
        color: "#1F2937",
    },

    categoryList: {
        marginTop: 15,
        paddingLeft: 20,
    },

    category: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 15,
        paddingVertical: 9,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    selectedCategory: {
        backgroundColor: "#2563EB",
        borderColor: "#2563EB",
    },

    categoryText: {
        color: "#555",
        fontSize: 13,
    },

    selectedCategoryText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },

    resultHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },

    resultTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1F2937",
    },

    resultCount: {
        fontSize: 13,
        color: "#6B7280",
    },

    list: {
        paddingHorizontal: 20,
        paddingBottom: 90,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },

    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#EFF6FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    icon: {
        fontSize: 23,
    },

    titleContainer: {
        flex: 1,
    },

    spaceName: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#1F2937",
    },

    type: {
        fontSize: 13,
        color: "#2563EB",
        marginTop: 3,
    },

    info: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 7,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    status: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 15,
    },

    available: {
        backgroundColor: "#DCFCE7",
    },

    unavailable: {
        backgroundColor: "#FEE2E2",
    },

    statusText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#166534",
    },

    button: {
        backgroundColor: "#2563EB",
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 8,
    },

    disabledButton: {
        backgroundColor: "#9CA3AF",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "bold",
    },

    empty: {
        alignItems: "center",
        marginTop: 50,
    },

    emptyIcon: {
        fontSize: 40,
        marginBottom: 10,
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },

    emptyText: {
        fontSize: 14,
        color: "#777",
        marginTop: 5,
    },

    bottomNav: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    navItem: {
        alignItems: "center",
        justifyContent: "center",
    },

    navIcon: {
        fontSize: 20,
        marginBottom: 3,
    },

    navText: {
        fontSize: 11,
        color: "#777",
    },

    activeNavText: {
        fontSize: 11,
        color: "#2563EB",
        fontWeight: "bold",
    },

});